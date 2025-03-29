const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport");
const connectDB = require("./database");
const userRoute = require("./Routes/UserRoute");
const authRoute = require("./Routes/AuthRoute");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
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
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.static(path.join(__dirname, "../Frontend/javascript")));
app.use(userRoute);

//     app.get("*", (req, res, next) => {
//         if (req.originalUrl.includes(".")) {
//             return next();
//         }
//         res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
//     });
app.listen(PORT, () => {
    console.log(`*Server is running at: http://localhost:${PORT}`);
});