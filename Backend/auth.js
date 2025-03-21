const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./database");

const router = express.Router();
let db;

connectDB().then((database) => {
    db = database;
});

// 📌 Đăng ký
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user vào database
    await db.collection("users").insertOne({ name, email, password: hashedPassword });
    res.json({ message: "Đăng ký thành công!" });
});

// 📌 Đăng nhập
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra user
    const user = await db.collection("users").findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // Tạo token
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ message: "Đăng nhập thành công!", token });
});

module.exports = router;
