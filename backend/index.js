const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("./config/config");
const googleRoutes = require("./routes/googleRoutes");
const userRoutes = require("./routes/eventRoutes");
const { authJWT } = require("./middleware/auth");

const app = express();
app.use(cors());

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hi there" });
});

app.use("/api", googleRoutes);
app.use(authJWT);
app.use("/user", userRoutes);

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
