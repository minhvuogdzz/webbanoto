const User = require("../models/user");

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
  }
};

// Lấy thông tin một user theo ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy user", error });
  }
};

// Tạo user mới
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo user", error });
  }
};

// Xóa user theo ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User không tồn tại" });
    res.json({ message: "User đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa user", error });
  }
};

// Export tất cả hàm
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
};
