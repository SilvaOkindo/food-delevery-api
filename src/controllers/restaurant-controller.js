import { Restaurant } from "../models/restaurant.js";

export const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();

  res.status(200).send(restaurants);
};

export const getRandomRestaurants = async (req, res) => {
  try {
    let randomRestaurants = [];
    if (req.params.code) {
      randomRestaurants = await Restaurant.aggregate([
        { $match: { code: req.params.code } },
        { $sample: { size: 5 } },
        { $project: { __v: 0 } },
      ]);
    }

    if (!randomRestaurants.length) {
      randomRestaurants = await Restaurant.aggregate([
        { $sample: { size: 5 } },
        { $project: { __v: 0 } },
      ]);
    }

    if (randomRestaurants.length) {
      res.status(200).send(randomRestaurants);
    }


  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
      const restaurant = await Restaurant.findById(id);
      if (!restaurant)
        return res.status(404).json({ message: "Restaurant not found" });
  
      return res.status(200).json({ success: true, restaurant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

export const createRestaurant = async (req, res) => {
  const restaurant = req.body;
  try {
    const newRestaurant = new Restaurant(restaurant);
    await newRestaurant.save();

    res
      .status(201)
      .json({ success: true, message: "Restaurant saved successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const serviceAvailability = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    restaurant.isAvailable = !restaurant.isAvailable;

    await restaurant.save();

    return res
      .status(200)
      .json({ success: true, isAvailable: restaurant.isAvailable });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const UpdatedRestaurant = await Restaurant.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { $new: true }
    );

    if (!UpdatedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    return res
      .status(200)
      .json({ success: true, message: "Restaurant updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
      const restaurant = await Restaurant.findByIdAndDelete(id);
  
      if (!restaurant)
        return res.status(404).json({ message: "Restaurant not found" });
  
      return res
        .status(200)
        .json({ success: true, message: "Deleted restaurant successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };