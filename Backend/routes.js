const express = require("express");
const connectDB = require("./database");

const router = express.Router();
let db;

// Kết nối database
connectDB().then((database) => {
    db = database;
});

// 📌 Lấy danh sách users
router.get("/users", async (req, res) => {
    const users = await db.collection("users").find().toArray();
    res.json(users);
});

// 📌 Thêm user mới từ form
router.post("/users", async (req, res) => {
    const newUser = req.body;
    await db.collection("users").insertOne(newUser);
    res.json({ message: "User đã được thêm!" });
});

module.exports = router;
