const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Địa chỉ MongoDB cục bộ
const client = new MongoClient(uri);
const dbName = "Anh Huy Auto";
let dbInstance = null;

async function connectDB() {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        await client.connect();
        console.log("=> Kết nối MongoDB thành công!");
        dbInstance = client.db(dbName); // Chọn database "mydatabase"
        return dbInstance;
    } catch (err) {
        console.error("!*Lỗi kết nối MongoDB:", err);
    }
}

module.exports = connectDB;
