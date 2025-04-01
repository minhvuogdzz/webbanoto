const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    name: { type: String },
    avatar: { type: String, default: "/image/default-avatar.png" }, // Default avatar
    role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", UserSchema);
