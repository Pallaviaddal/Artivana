const Cart = require("../models/cartModel");

// ➕ Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, name, price, image } = req.body;

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
      name,
      price,
      image,
    });

    res.status(201).json(cartItem);
  } catch (err) {
    console.error("Add to cart failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📦 Get user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.find({ userId });
    res.status(200).json(cart);
  } catch (err) {
    console.error("Get cart failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Remove from cart failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
