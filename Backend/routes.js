const express = require("express");

function createRoutes(db) {
    const router = express.Router();

    router.get("/status", (req, res) => {
        res.json({ message: "API active" });
    });

    router.get("/users", async (req, res) => {
        try {
            const users = await db.collection("users").find().toArray();
            res.json(users);
        } catch (error) {
            console.error("Error pull users list:", error);
            res.status(500).json({ message: "Error server!" });
        }
    });

    return router;
}

module.exports = createRoutes;
