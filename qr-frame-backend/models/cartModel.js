const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  frameId: { type: mongoose.Schema.Types.ObjectId, ref: "Frame", required: true },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
