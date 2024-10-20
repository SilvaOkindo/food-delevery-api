import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
    instructions: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
