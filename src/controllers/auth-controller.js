import { User } from "../models/User"
import cryptoJs from "crypto-js"


export const registerUser = async (req, res) => {
    const user = req.body

    try {
        const findUser = await User.findOne({email: user.email})

        if(!findUser) {
            return res.status(400).json({message: "User already exists"})
        }

        const newUser = User(user)

        // hashing password
        //newUser.password = ''

        

        await newUser.save()

        newUser.password = undefined

        return res.json(201).send(newUser)

    } catch(error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const findUser = await User.findOne({email})
        if(!findUser) res.status(404).json({message: "User not found"})
        
    } catch (error) {
        
    }
}

