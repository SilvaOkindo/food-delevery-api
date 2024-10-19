import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},{timestamps: true})

export const Category = mongoose.model("Category", categorySchema)

