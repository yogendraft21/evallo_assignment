const express = require("express");
const {
  googleAuth,
  googleRedirect,
  googleLogin,
  createToken,
} = require("../controllers/googleController");
const router = express.Router();

router.post("/create-token", createToken);
router.post("/google/redirect", googleRedirect);

module.exports = router;
