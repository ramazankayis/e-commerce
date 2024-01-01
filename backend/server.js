const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 5000;
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send(" 19191991919 bu api router");
});
app.listen(port, () => {
  connect();
  console.log(`sunucu ${port} portunda çalışıyor`);
});
