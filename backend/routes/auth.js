const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 70 + 1);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

// kullanıcı oluşturma(create - Register)

router.post("/register", async (req, res) => {
  try {
    const defaultAvatar = generateRandomAvatar();
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email address is already registed." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("defaultAvatar", defaultAvatar);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});

// kullanıcı girişi( login)

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
      return res.status(401).json({ error: "invalid email ." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "invalid password." });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});

module.exports = router;
