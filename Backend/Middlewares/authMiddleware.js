const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    console.log("Authorization Header:", authHeader); 
    console.log("Token được trích xuất:", token); 

    if (!token) {
        console.error("Không tìm thấy token trong Authorization Header!");
        return res.status(401).json({ message: "Không có token, truy cập bị từ chối!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token đã được giải mã:", decoded); // Debug decoded token
        req.user = decoded; // Lưu thông tin user vào request để dùng ở các route tiếp theo
        next();
    } catch (error) {
        console.error("Lỗi xác thực token:", error);
        return res.status(403).json({ message: "Token không hợp lệ!" });
    }
};