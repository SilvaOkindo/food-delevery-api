import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    additives: {type: Array},
    instructions: {type: String, default: ''}
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItem: [orderItemSchema],
    orderTotal: {type: Number, required: true},
    deliveryFee: {type: Number, required: true},
    grandTotal: {type: Number, required: true},
    deliveryAddress: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    paymentMethod: {type: String},
    paymentStatus: {type: String, default: "Pending", enum: ["Pending", "Completed", "Failed"]},
    orderStatus: {type: String, default: "Placed", enum: ["Placed", "Preparing", "Failed"]},
    orderDate: {type: Date, default: Date.now()},
    restaurantId: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
    driverId: {type: mongoose.Schema.Types.Object, ref: "Driver"},
    ratings: {type: Number, min: 1, max: 5},
    feedback: {type: String},
    promoCode: {type: String}

})


export const Order = mongoose.model("Order", orderSchema)