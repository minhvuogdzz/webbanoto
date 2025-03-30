const uri = process.env.MONGODB_URI;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Kết nối MongoDB thành công!");
  } catch (err) {
    console.error("Lỗi kết nối MongoDB:", err);
    process.exit(1); // Dừng server nếu lỗi
  }
};

module.exports = connectDB;
