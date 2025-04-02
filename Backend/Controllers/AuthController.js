const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import User Model

let refreshTokens = []; // Store refresh tokens temporarily (should be stored in DB in production)

// Đăng ký tài khoản
const register = async (req, res) => {
    try {
        console.log("Đăng ký tài khoản:", req.body); // Debug registration data
        const { name, email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            console.log("Email đã tồn tại:", normalizedEmail); // Debug duplicate email
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
        console.log("Đăng ký thành công:", newUser); // Debug new user
        res.json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("Lỗi đăng ký:", error); // Debug error
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// Đăng nhập
const login = async (req, res) => {
    try {
        console.log("Dữ liệu đăng nhập:", req.body); // Debug login data
        const { email, username, password } = req.body;

        let user;
        if (username) {
            console.log("Đăng nhập bằng username:", username); // Debug username
            user = await User.findOne({ username, role: "admin" });
        } else if (email) {
            console.log("Đăng nhập bằng email:", email); // Debug email
            user = await User.findOne({ email });
        } else {
            return res.status(400).json({ message: "Vui lòng nhập email hoặc username!" });
        }

        if (!user) {
            console.error("Không tìm thấy user!"); // Debug user not found
            return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("Mật khẩu không đúng!"); // Debug password mismatch
            return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        refreshTokens.push(refreshToken); // Store refresh token
        console.log("Đăng nhập thành công! Token:", token); // Debug token
        res.json({ 
            message: "Đăng nhập thành công!", 
            token, 
            refreshToken, 
            email: user.email, 
            username: user.username, 
            role: user.role, 
            avatar: user.avatar || "/image/default-avatar.png" // Ensure avatar is included
        });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error); // Debug error
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
        res.json({ 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            avatar: user.avatar || "/image/default-avatar.png", // Ensure avatar is included
            createdAt: user.createdAt 
        });
    } catch (error) {
        console.error("Lỗi lấy profile:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// Google Login
const googleCallback = (req, res) => {
    const user = req.user;

    if (!user || !user.token || !user.refreshToken) {
        console.error("Lỗi: Không thể tạo token cho người dùng Google.");
        return res.redirect(`/login.html?error=Không thể đăng nhập bằng Google!`);
    }

    const userInfo = {
        token: user.token,
        refreshToken: user.refreshToken,
        email: user.email,
        name: user.name,
        avatar: "/image/default-avatar.png" // Set default avatar
    };

    console.log("Thông tin người dùng Google:", userInfo); // Debug user info
    const userInfoString = encodeURIComponent(JSON.stringify(userInfo));
    res.redirect(`/index.html?userInfo=${userInfoString}`);
};

// Refresh Token
const refreshToken = (req, res) => {
    const { token } = req.body;
    console.log("Yêu cầu làm mới token:", token); 

    if (!token) {
        console.error("Không có Refresh Token!"); 
        return res.status(401).json({ message: "Không có Refresh Token!" });
    }

    if (!refreshTokens.includes(token)) {
        console.error("Refresh Token không hợp lệ!"); 
        return res.status(403).json({ message: "Refresh Token không hợp lệ!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
        console.log("Token mới được cấp:", accessToken); // Debug new token
        res.json({ accessToken });
    } catch (error) {
        console.error("Lỗi xác thực Refresh Token:", error); // Debug error
        res.status(403).json({ message: "Refresh Token không hợp lệ!" });
    }
};

// Đăng xuất
const logout = (req, res) => {
    const { token } = req.body;
    console.log("Đăng xuất, xóa token:", token); // Debug token khi đăng xuất
    refreshTokens = refreshTokens.filter(rt => rt !== token); // Xóa refresh token khỏi danh sách
    res.json({ message: "Đăng xuất thành công!" });
};

// Export tất cả hàm
module.exports = {
    register,
    login,
    getProfile,
    googleCallback,
    refreshToken, // Add refreshToken to exports
    logout
};