const express = require("express");
const userController = require("../Controllers/UserController");

const router = express.Router();

router.get("/list", userController.getAllUsers);
router.get("/getByID", userController.getUserById);
router.post("/create", userController.createUser);
router.post("/createAdmin", userController.createAdmin);
router.delete("/:id", userController.deleteUser);

module.exports = router;