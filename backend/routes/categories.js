const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

//yeni bir kategori oluşturma (create oluşturma)
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log("error", error);
  }
});

// Tüm kategorileri getirme
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});

//Belirli bir kategoriyi getirme (Read-single)

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({error: "Category not found."})
    }
    res.status(200).json(category);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});

// güncelleme

module.exports = router;