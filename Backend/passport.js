const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user");

passport.serializeUser((user, done) => {
    done(null, user.token);
});

passport.deserializeUser((token, done) => {
    done(null, { token });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Google Profile:", profile); // Debug Google profile
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
            console.log("Tạo user mới từ Google:", email); // Debug new user creation
            user = {
                name: profile.displayName,
                email: email,
                avatar: profile.photos[0].value,
                createdAt: new Date()
            };
            await User.insertOne(user);
        }

        console.log("Đăng nhập Google thành công! User:", user); // Debug successful login
        done(null, { token: accessToken, email: user.email, name: user.name, avatar: user.avatar });
    } catch (error) {
        console.error("Lỗi trong Google Strategy:", error); // Debug error
        done(error, null);
    }
}));

module.exports = passport;