const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true },
    name: { type: String },
    avatar: { type: String }
});

module.exports = mongoose.model("User", UserSchema);
