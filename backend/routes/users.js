const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Tüm kullanıcıları getirme (Read-All)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});

// Kullanıcı silme (Delete)
router.delete("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }
  
      res.status(200).json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
module.exports = router;
