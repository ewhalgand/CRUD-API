const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productsRoute = require("./routes/products");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Home */
app.get("/", (req, res) => {
  res.send(`<h3 style="font-family: sans-serif">My CRUD API !</h3>`);
});

/* Routes */
app.use("/api/products", productsRoute);

/* Connect to DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    /* Listen */
    app.listen(process.env.PORT, () => {
      console.log(`connect to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
