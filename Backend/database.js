const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
let db;

async function connectDB() {
    if (db) return db;
    try {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        db = client.db();
        return db;
    } catch (error) {
        console.error("Lỗi kết nối Database:", error);
        throw error;
    }
}

module.exports = connectDB;
