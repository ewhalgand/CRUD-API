const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

/* GET all products */
router.get("/", getProducts);

/* GET a single product */
router.get("/:id", getProduct);

/* POST a product */
router.post("/", createProduct);

/* UPDATE a product */
router.patch("/:id", updateProduct);

/* DELETE a product */
router.delete("/:id", deleteProduct);

module.exports = router;
