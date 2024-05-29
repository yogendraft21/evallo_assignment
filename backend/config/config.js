require("dotenv").config();

module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URL: process.env.REDIRECT_URL,
  PORT: 8000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};
