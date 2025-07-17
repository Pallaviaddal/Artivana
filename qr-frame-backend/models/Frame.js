const mongoose = require("mongoose");

const frameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, default: "background" },
  description: { type: String },
  description_hi: { type: String },
  description_te: { type: String },
  image: { type: String },
  video: { type: String }, // Optional
  audio: { type: String }, // Optional
}, { timestamps: true });

frameSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Cart.deleteMany({ frameId: doc._id });
    console.log(`Deleted related cart items for frame ${doc._id}`);
  }
});

module.exports = mongoose.model("Frame", frameSchema);
