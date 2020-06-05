const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: { type: String, required: true },
  total_price: { type: Number, required: true },
  user_id: { type: String, required: true },
});

mongoose.model("order", orderSchema);
