const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user");
const connectDB = require("./database");
require("dotenv").config();

let db;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(" Google Login Success:", profile);

                if (!db) {
                    console.log("Connecting to MongoDB...");
                    db = await connectDB();
                }

                console.log("Searching for user in database...");
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    console.log("👤 User not found, creating new user...");
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value
                    });
                }

                console.log("User found or created:", user);
                return done(null, user);
            } catch (err) {
                console.error("Error in Google authentication:", err);
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

module.exports = passport;