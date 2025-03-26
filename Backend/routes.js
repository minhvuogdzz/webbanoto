const express = require("express");
const connectDB = require("./database");

const router = express.Router();
let db;

// Lấy danh sách users
router.get("/users", async (req, res) => {
    if (!db) return res.status(500).json({ message: "Lỗi server, thử lại sau!" });
    const users = await db.collection("users").find().toArray();
    res.json(users);
});

// Thêm user mới từ form
router.post("/users", async (req, res) => {
    if (!db) return res.status(500).json({ message: "Lỗi server, thử lại sau!" });
    const newUser = req.body;
    await db.collection("users").insertOne(newUser);
    res.json({ message: "User đã được thêm!" });
});

module.exports = router;
