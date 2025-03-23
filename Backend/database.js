const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Địa chỉ MongoDB cục bộ
const client = new MongoClient(uri);

async function connectDB() {

  //Xử lý ngoại lệ kết nối database
  try {
    await client.connect();
    console.log("=> Kết nối MongoDB thành công!");
    return client.db("mydatabase"); // Chọn database "mydatabase"
  } catch (err) {
    console.error("!*Lỗi kết nối MongoDB:", err);
  }
}

module.exports = connectDB;
