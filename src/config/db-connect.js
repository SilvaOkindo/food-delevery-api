import mongoose from "mongoose"

export const dbConnect = () => {
    mongoose.connect("mongodb://localhost/food-delivery").then(() => {
        console.log("connected to db...")
    }).catch((error) => {
        console.log(error)
    })
}

