import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    foodTags: { type: Array, required: true },
    category: { type: String, required: true },
    code: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    ratingsCount: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    additives: {type: Array, required: true},
    imageUrl: { type: Array, required: true }
  },
  { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
