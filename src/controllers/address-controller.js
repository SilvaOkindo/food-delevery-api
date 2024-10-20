import { Address } from "../models/address.js";

export const addAddress = async (req, res) => {
  const userId = req.user.id;
  const {
    addressLine1,
    city,
    state,
    district,
    postalCode,
    country,
    deliveryInstructions,
    defaultValue,
  } = req.body;

  const newAddress = new Address({
    userId: userId,
    addressLine1: addressLine1,
    city: city,
    state: state,
    district: district,
    postalCode: postalCode,
    country: country,
    deliveryInstructions: deliveryInstructions,
    defaultValue: defaultValue,
  });

  try {
    if (defaultValue) {
      await Address.updateMany({ userId: userId }, { defaultValue: false });
    }

    await newAddress.save();
    res.status(201).json({ message: "Address added successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const address = await Address.findById(id);
    if (!address) {
      res.status(404).json({ message: "Address not found" });
    }

    await Address.findByIdAndDelete(id);

    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findDefaultAddress = async (req, res) => {
  const userId = req.user.id;
  try {
    const address = await Address.findOne({
      userId: userId,
      defaultValue: true,
    });

    if (!address) {
      res.status(404).json({ message: "Address not found" });
    }

    res.status(200).send(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDefaultAddress = async (req, res) => {
  const userId = req.user.id;
  try {
    const address = await Address.findOne({
      userId: userId,
    });

    if (!address) {
      res.status(404).json({ message: "Address not found" });
    }

    res.status(200).send(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.params.id

  try {


    if(req.body.defaultValue) {
        await Address.updateMany({userId: userId}, {defaultValue: false})
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { $new: true }
    );

    if (!updatedAddress) {
      res.status(404).json({ message: "Address not found" });
    }

    res.status(201).json({message: "Address updated"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const setDefaultAddress = async (req, res) => {
    const addressId = req.params.id
    const userId = req.user.id
    try {

        await Address.updateMany({userId}, {defaultValue: false})

        const updateAddress = await Address.findByIdAndUpdate(addressId, {defaultValue: true})

        if(!updateAddress) {
            res.status(404).json({message: "Address not found"})
        }
        res.status(201).json({message: "Address updated"}) 
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}