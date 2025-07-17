const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");

// GET /api/cart/:userId — Fetch all cart items by user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.find({ userId }).populate("frameId"); // Assuming frameId is ref to Frame
    res.json(cartItems);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

// POST /api/cart — Add new item
router.post("/", async (req, res) => {
  const { userId, frameId } = req.body;
  try {
    const existing = await Cart.findOne({ userId, frameId });
    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.status(200).json({ message: "Updated quantity" });
    }
    const newItem = new Cart({ userId, frameId, quantity: 1 });
    await newItem.save();
    res.status(201).json({ message: "Item added" });
  } catch (err) {
    console.error("Add error:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// PUT /api/cart/:id — Update quantity
router.put("/:id", async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.quantity = req.body.quantity;
    await item.save();
    res.json({ message: "Quantity updated", item });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Error updating cart" });
  }
});

// DELETE /api/cart/:id — Remove from cart
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
