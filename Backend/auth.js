require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./database");

const router = express.Router();
let db;

// Kết nối database
connectDB()
    .then((database) => {
        db = database;
        console.log("Kết nối Database thành công!");
    })
    .catch((err) => {
        console.error("Lỗi kết nối Database:", err);
    });

//Đăng ký tài khoản
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!db) return res.status(500).json({ message: "Lỗi server, thử lại sau!" });

        const normalizedEmail = email.toLowerCase().trim();

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await db.collection("users").findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Thêm user vào database
        const newUser = {
            name: name || "User", // Nếu không nhập name thì mặc định là "User"
            email: normalizedEmail,
            password: hashedPassword,
            createdAt: new Date(),
        };

        await db.collection("users").insertOne(newUser);
        console.log("Đăng ký thành công cho email:", normalizedEmail);

        res.json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
});

// Đăng nhập
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(" Email nhận được:", email);
        console.log(" Mật khẩu nhận được:", password);

        if (!db) return res.status(500).json({ message: "Lỗi server, thử lại sau!" });

        const normalizedEmail = email.toLowerCase().trim();
        console.log("Email chuẩn hóa:", normalizedEmail);

        // Kiểm tra user có tồn tại không
        const user = await db.collection("users").findOne({ email: normalizedEmail });
        console.log("*User tìm thấy:", user);

        if (!user) {
            console.log("!*User không tồn tại:", normalizedEmail);
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Mật khẩu nhập:", password);
        console.log("Mật khẩu trong DB:", user.password);
        console.log("Kết quả so sánh:", isMatch);

        console.log("*Kết quả kiểm tra mật khẩu:", isMatch);

        if (!isMatch) {
            console.log("*Mật khẩu không đúng cho user:", normalizedEmail);
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        // Tạo token
        console.log(" *Giá trị JWT_SECRET:", process.env.JWT_SECRET);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("=>Tạo token thành công:", token);

        res.json({ message: "Đăng nhập thành công!", token, email: user.email }); // Include email
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
});

//Lấy thông tin user (code JWT)
router.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "Không có token!" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.collection("users").findOne({ _id: decoded.userId });

        if (!user) return res.status(404).json({ message: "Không tìm thấy user!" });

        res.json({ name: user.name, email: user.email, createdAt: user.createdAt });
    } catch (error) {
        console.error("Lỗi lấy profile:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
});

module.exports = router;
