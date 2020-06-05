const mongoose = require("mongoose");
const Product = mongoose.model("product");

module.exports = (app) => {
  // Get all products.
  app.get("/api/product", async (req, res) => {
    const product = Product.find();
    res.status(200).json({ status: "success", data: product });
  });

  // Find product.
  app.get("/api/product/:id", async (req, res) => {
    const product = Product.findById(req.params.id);
    res.status(200).json({ status: "success", data: product });
  });
};
