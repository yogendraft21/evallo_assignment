const { OAuth2Client } = require("google-auth-library");
const config = require("../config/config");
// const { getAccessToken } = require("../services/googleService");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const oauth2Client = new OAuth2Client(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URL
);

// const scopes = [
//   "https://www.googleapis.com/auth/calendar",
//   "https://www.googleapis.com/auth/userinfo.email",
//   "https://www.googleapis.com/auth/userinfo.profile",
//   "openid",
// ];

exports.createToken = async (req, res) => {
  const { code } = req.body;
  const response= await oauth2Client.getToken(code)
  res.send(response)
}

exports.googleRedirect = async (req, res) => {
     const { token } = req.body;
  try {
    // Verify ID token and get user data
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: config.CLIENT_ID,
    });

    const data = ticket.getPayload();

    // Check if user already exists
    let user = await User.findOne({ googleId: data.sub });
    if (!user) {
      // Create a new user
      user = new User({
        googleId: data.sub,
        email: data.email,
        username: data.name,
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ userId: user._id }, config.JWT_SECRET);

    return res.status(200).json({
      message: "User info retrieved successfully",
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.error("Error during Google OAuth redirection:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


