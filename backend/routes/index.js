const express = require("express");
const router = express.Router();

// Diğer route dosyalarını içe aktarıyoruz.

const categoryRoute = require("./categories.js");
const productRoute = require("./products.js");

// her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/products", productRoute);

module.exports = router;
