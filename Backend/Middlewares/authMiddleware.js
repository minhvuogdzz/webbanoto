const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Không có token, truy cập bị từ chối!" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào request để dùng ở các route tiếp theo
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token không hợp lệ!" });
    }
};