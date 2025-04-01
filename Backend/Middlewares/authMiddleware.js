const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Debug authorization header

    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    console.log("Token được trích xuất:", token); // Debug extracted token

    if (!token) {
        console.error("Không có token!"); // Debug missing token
        return res.status(401).json({ message: "Không có token!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Lỗi xác thực token:", err); // Debug token verification error
            return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
        }
        console.log("Token hợp lệ! User:", user); // Debug valid token
        req.user = user;
        next();
    });
};