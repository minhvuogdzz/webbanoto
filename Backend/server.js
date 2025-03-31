const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport");
const connectDB = require("./database");
const userRoute = require("./Routes/UserRoute");
const authRoute = require("./Routes/AuthRoute");
const carRoute = require("./Routes/CarRoute");


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:4000", // Thay đổi nếu frontend chạy ở domain khác
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"] // Cho phép header Authorization
}));
app.use(express.json());

connectDB();
//Check .env
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use(express.static(path.join(__dirname, "../Frontend"))); // Phục vụ tệp tĩnh từ thư mục Frontend
app.use(express.static(path.join(__dirname, "../Frontend/javascript"))); // Phục vụ tệp JS
app.use(express.static(path.join(__dirname, "../Frontend/stylecss"))); // Phục vụ tệp CSS
app.use(express.static(path.join(__dirname, "../Frontend/image"))); // Phục vụ hình ảnh
app.use(userRoute);
app.use(carRoute);
app.listen(PORT, () => {
    console.log(`*Server is running at: http://localhost:${PORT}`);
});