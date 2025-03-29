const express = require("express");

function createRoutes(db) {
    const router = express.Router();

    router.get("/status", (req, res) => {
        res.json({ message: "API đang hoạt động" });
    });

    router.get("/users", async (req, res) => {
        try {
            const users = await db.collection("users").find().toArray();
            res.json(users);
        } catch (error) {
            console.error("Lỗi lấy danh sách user:", error);
            res.status(500).json({ message: "Lỗi server!" });
        }
    });

    return router;
}

module.exports = createRoutes;
