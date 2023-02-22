// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// internal imports
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routing setup
app.get("/", async (req, res) => {
  const clientIp = req.ip;
  console.log(`Client IP address is: ${clientIp}`);
  const clientIp2 =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(`Client IP 2 address is: ${clientIp2}`);
  res.send({ clientIp, clientIp2 });
});

app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Chai Ai Backend Server running on port ${PORT}`);
});
