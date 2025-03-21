const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");
const authRoutes = require("./auth");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Cho phép frontend gọi API
app.use(express.json()); // Xử lý JSON
app.use(express.static(path.join(__dirname, "../Frontend")));

app.use("/api", routes); // API chính
app.use("/auth", authRoutes); // API đăng nhập & đăng ký

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
