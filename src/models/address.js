import mongoose, { Schema } from "mongoose"

const addressSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    deliveryInstructions: {
        type: String
    },
    defaultValue: {
        type: Boolean, default: true
    }
}, {timestamps: true})


export const Address = mongoose.model("Address", addressSchema)