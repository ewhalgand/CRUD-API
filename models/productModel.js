const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
