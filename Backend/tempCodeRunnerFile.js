require('dotenv').config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport");
const routes = require("./routes");
const authRoutes = require("./auth");
const connectDB = require("./database");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Cho phép frontend gọi API
app.use(express.json()); // Xử lý JSON

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes); // API chính
app.use("/auth", authRoutes); // API đăng nhập & đăng ký

app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.static(path.join(__dirname, "../Frontend/javascript"))); 

app.get("*", (req, res, next) => {
    if (req.originalUrl.includes(".")) {
        return next(); // Nếu request là file tĩnh (có dấu .), bỏ qua
    }
    res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server đang chạy tại: http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Lỗi kết nối Database, server không thể khởi động:", err);
});
