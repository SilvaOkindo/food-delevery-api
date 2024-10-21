import mongoose from "mongoose"

export const driverSchema = mongoose.Schema({
    driver: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    vehicleType: {type: String, required: true, enum: ["Bike", "Scooter", "Car"]},
    vehicleNumber: {type: String, required: true},
    currentLocation: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        latitudeDelta: {type: Number, required: true, default: 0.0122},
        longitudeDelta: {type: Number, required: true, default: 0.0221},
    },
    isAvailable: {type: Boolean, required: true},
    rating: {type: String, required: true},
    totalDeliveries: {type: Number, default: 0},
    profileImage: {type: String, default: ""}
}, {timestamps: true})

export const Driver = mongoose.model("Driver", driverSchema)