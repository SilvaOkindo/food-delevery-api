import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: Array,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ["Admin", "Client", "Driver", "Vendor"],
      default: "Client",
    },
    profile: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema)
