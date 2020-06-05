const mongoose = require("mongoose");
const Order = mongoose.model("order");
const jwt = require("jsonwebtoken");
const isAuthorized = require("../middlewares/Authorized");

module.exports = (app) => {
  // Create order
  app.post("/api/order", isAuthorized, async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);

    const order = await new Order();
    order.name = req.body.name;
    order.total_price = req.body.total_price;
    order.user_id = decoded.userID;
    order.save();

    res.status(200).json({ status: "success", data: order });
  });

  // Delete order
  app.delete("/api/order/:id", async (req, res) => {
    const order = await Order.findById(req.params.id);
    order.delete();
    res.status(200).json({ status: "success", msg: "Delete success." });
  });

  // Find order
  app.get("/api/order/:id", async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({ status: "success", data: order });
  });
};
