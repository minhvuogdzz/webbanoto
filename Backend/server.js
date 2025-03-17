const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Cấu hình để phục vụ file tĩnh từ thư mục "public" (lùi lên 1 cấp)
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});


