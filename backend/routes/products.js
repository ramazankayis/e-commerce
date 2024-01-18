const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
// Tüm ürünleri getirme
// router.get("/", async (req, res) => {
//   res.send("ürünler getirildi.");
// });

//yeni bir ürün oluşturma (create oluşturma)
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});

// Tüm ürünleri getirme (Read-All)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});
//Belirli bir ürünü getirme (Read-single)

router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ eror: "Server error." });
  }
});

// ürün güncelleme (update)

router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// ürün silme (Delete)
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürünleri isme göre arama (searching)

router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;

    const products = await Product.find({
      name: {
        $regex: productName,
        $options: "i",
      },
    });

    if (!res.status(200)) {
      return res.status(500).json({ error: "Product not found." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
