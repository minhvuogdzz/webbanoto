require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport");
const connectDB = require("./database");
const createAuthRouter = require("./auth");
const createRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

connectDB().then((db) => {
    console.log("*Database connected");

    app.use("/auth", createAuthRouter(db));
    app.use("/api", createRoutes(db));

    app.use(express.static(path.join(__dirname, "../Frontend")));
    app.use(express.static(path.join(__dirname, "../Frontend/javascript")));

    app.get("*", (req, res, next) => {
        if (req.originalUrl.includes(".")) {
            return next();
        }
        res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
    });

    app.listen(PORT, () => {
        console.log(`*Server đang chạy tại: http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("#Lỗi kết nối Database:", err);
});
