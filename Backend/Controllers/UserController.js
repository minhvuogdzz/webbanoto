// controllers/userController.js
const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả user từ DB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy user", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body); // Tạo user từ request body
    await newUser.save(); // Lưu vào MongoDB
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo user", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User không tồn tại" });
    res.json({ message: "User đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa user", error });
  }
};
