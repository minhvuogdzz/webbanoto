const express = require("express");
const userController = require("../Controllers/UserController");

const router = express.Router();

router.get("/users", userController.getAllUsers);       // Lấy danh sách user
router.get("/:id", userController.getUserById);   // Lấy user theo ID
router.post("/", userController.createUser);      // Thêm user mới
router.delete("/:id", userController.deleteUser); // Xóa user theo ID

module.exports = router;