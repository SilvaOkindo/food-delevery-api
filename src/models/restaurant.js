import mongoose from "mongoose";

export const restaurantSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    foods: {type: Array},
    pickup: {
        type: Boolean,
        required: false,
        default: true
    },
    delivery: {
        type: Boolean,
        required: false,
        default: true
        },
    owner: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    code: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true,
        default: ""
    },
    ratings: {
        type: Number,
        min: 1, max: 5
    },
    ratingCount: {
        type: String
    },
    coords: {
        id: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        latitudeDelta: {type: Number, required: true},
        longitudeDelta: {type: Number, required: true},
        address: {type: String, required: true},
        title: {type: String, required: true}
    }
}, {timestamps: true})


export const Restaurant = mongoose.model("Restaurant", restaurantSchema)