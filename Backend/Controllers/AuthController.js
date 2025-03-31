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
        const { email, username, password } = req.body;

        let user;
        if (username) {
            // Đăng nhập bằng username (admin)
            user = await User.findOne({ username, role: "admin" });
        } else if (email) {
            // Đăng nhập bằng email (người dùng)
            user = await User.findOne({ email });
        } else {
            return res.status(400).json({ message: "Vui lòng nhập email hoặc username!" });
        }

        if (!user) {
            return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Token:", token); // Log token for debugging
        res.json({ message: "Đăng nhập thành công!", token, email: user.email, username: user.username, role: user.role });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// Lấy thông tin profile từ token
const getProfile = async (req, res) => {
    try {
        console.log("Thông tin user từ middleware:", req.user); // Debug thông tin user từ middleware
        const user = await User.findOne({ _id: req.user.userId });
        if (!user) {
            console.error("Không tìm thấy user với ID:", req.user.userId); // Debug user ID
            return res.status(404).json({ message: "Không tìm thấy user!" });
        }
        console.log("Thông tin user từ database:", user); // Debug thông tin user từ database
        res.json({ name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }); // Trả về role
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