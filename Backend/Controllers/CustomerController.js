const Customer = require("../models/customer");

// Tạo mới customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    // Kiểm tra nếu collection rỗng thì tạo luôn, không cần check tồn tại
    const customerCount = await Customer.countDocuments();

    if (customerCount > 0) {
      const emailExist = await Customer.findOne({ email });
      const phoneExist = await Customer.findOne({ phoneNumber });

      if (emailExist || phoneExist) {
        return res.status(400).json({ message: "Email hoặc số điện thoại đã tồn tại!" });
      }
    }

    const newCustomer = new Customer({ name, email, phoneNumber });
    await newCustomer.save();
    return res.status(201).json({ message: "Thêm thành công!" });
  } catch (error) {
    console.error("❌ Lỗi khi tạo khách hàng:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Lỗi khi tạo khách hàng", error });
    }
  }
};

// Lấy danh sách tất cả customer
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách khách hàng", error });
  }
};

// Xoá customer theo ID
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({ message: "Xoá thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá khách hàng", error });
  }
};

// Cập nhật thông tin customer
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật khách hàng", error });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
};