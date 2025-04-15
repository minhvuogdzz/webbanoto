const express = require("express");
const userController = require("../Controllers/UserController");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/user/id", userController.getUserById);
router.post("/user/create", userController.createUser);
router.post("/user/create-admin", userController.createAdmin);
router.delete("/user/id", userController.deleteUser);

module.exports = router;