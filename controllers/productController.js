const Product = require("../models/productModel");
const mongoose = require("mongoose");

/* GET all products */
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createAt: -1 });

  res.status(200).json(products);
};

/* GET a single product */
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ err: "No such product" });
  }

  res.status(200).json(product);
};

/* POST a product */
const createProduct = async (req, res) => {
  const { title, body, price } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!body) {
    emptyFields.push("body");
  }

  if (!price) {
    emptyFields.push("price");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ err: "Please fill in all the fields", emptyFields });
  }

  try {
    const product = await Product.create({ title, body, price });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

/* UPDATE a product */
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(404).json({ err: "No such product" });
  }

  res.status(200).json(product);
};

/* DELETE a product */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ err: "No such product" });
  }

  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
