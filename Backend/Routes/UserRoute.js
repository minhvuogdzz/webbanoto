const express = require("express");
const userController = require("../Controllers/UserController");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/id", userController.getUserById);
router.post("/users", userController.createUser);
router.delete("/id", userController.deleteUser);

module.exports = router;