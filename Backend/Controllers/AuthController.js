const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import User Model

// Đăng ký tài khoản
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name || "User",
            email: normalizedEmail,
            password: hashedPassword,
            createdAt: new Date(),
        });

        await newUser.save();
        res.json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// Đăng nhập
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Token:", token); // Log token for debugging
        res.json({ message: "Đăng nhập thành công!", token, email: user.email });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// Lấy thông tin profile từ token
const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "Không có token!" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) return res.status(404).json({ message: "Không tìm thấy user!" });
        res.json({ name: user.name, email: user.email, createdAt: user.createdAt });
    } catch (error) {
        console.error("Lỗi lấy profile:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// Google Login
const googleCallback = (req, res) => {
    const user = req.user;
    const userInfo = {
        token: req.session.passport.user,
        email: user.email,
        name: user.name,
        avatar: user.avatar
    };
    const userInfoString = encodeURIComponent(JSON.stringify(userInfo));
    res.redirect(`/index.html?userInfo=${userInfoString}`);
};

// Đăng xuất
const logout = (req, res) => {
    req.logout();
    res.redirect("/index.html");
};

// Export tất cả hàm
module.exports = {
    register,
    login,
    getProfile,
    googleCallback,
    logout
};