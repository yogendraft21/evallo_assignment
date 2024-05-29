const jwt = require("jsonwebtoken");
const config = require("../config/config")
require("dotenv").config();
const authJWT = (req, res, next) => {
  // console.log(req.headers)
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log(token);
  try {
    if (token) {
      const decode = jwt.verify(token, config.JWT_SECRET);
      // console.log(decode);
      if (decode) {
        const userId = decode.userId;
        req.body.userId = userId;
        // console.log(userId);
        next();
      } else {
        res.status(500).json({ message: "Invalid Credential" });
      }
    } else {
      res.status(500).json({ message: "You are not Authorize user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Problem with auth" });
  }
};
module.exports = {
  authJWT,
};
