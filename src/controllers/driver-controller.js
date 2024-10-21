import { Driver } from "../models/driver.js"

export const registerDriver = async (req, res) => {
    const driver = req.body
    try {
        const newDriver = new Driver(driver)

        await newDriver.save()

        res.status(201).json({message: "Driver registered successfully"})


    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const setDriveAvailability = async (req, res) => {
    const driverId = req.user.id
    try {
        const driver = await Driver.findById(driverId)

        if(!driver) {
            res.status(404).json({message: "Driver not found"})
        }

        driver.isAvailable = !driver.isAvailable

        res.status(200).json({isAvailable: driver.isAvailable})
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}