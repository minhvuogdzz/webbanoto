const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/AnhHuyAuto"; // Địa chỉ MongoDB cục bộ
let dbInstance = null;

async function connectDB() {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        dbInstance = mongoose.connection;
        return dbInstance;
    } catch (err) {
        console.error("!*Lỗi kết nối MongoDB:", err);
        throw err; // Re-throw the error after logging it
    }
}

module.exports = connectDB;
