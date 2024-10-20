import { Food } from "../models/food.js";

export const getAllFoodItems = async (req, res) => {
  const foodItems = await Food.find();

  res.status(200).send(foodItems);
};

export const getFoodItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await Food.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.status(200).json(foodItem);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getFoodItemsByRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const foodItems = await Food.find({ restaurant: restaurantId });

    if (foodItems.length === 0) {
      return res.status(404).json({ message: "No food items found." });
    }

    return res.status(200).send(foodItems);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getRandomFoodItems = async (req, res) => {
  try {

    const randomFoodItem = await Food.aggregate([
      {$match: {code: req.params.code}},
      {$sample: {size: 5}},
      {$project: {_id: 0}}
    ])

    res.status(200).send(randomFoodItem)
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


export const getRandomFoodItemsByCodesAndCategory = async (req, res) => {
  const {code, category} = req.params

  console.log(code, category)

  try {

    let randomFoods = await Food.aggregate([
      {$match: {code: code, category: category}},
      {$sample: {size: 10}}
    ])

    if(!randomFoods || randomFoods.length === 0) {
      randomFoods = await Food.aggregate([
        {$match: {code: code, category: category}},
        {$sample: {size: 10}}
      ])
    } else {
      randomFoods = await Food.aggregate([
        {$sample: {size: 10}}
      ])
    }

    res.status(200).send(randomFoods)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



export const createFoodItem = async (req, res) => {
  try {
    const newFoodItem = new Food(req.body);
    await newFoodItem.save();

    res.status(201).json({ message: "Food item added" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await Food.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await Food.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { $new: true }
    );

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.status(200).json({ message: "Food item updated successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await Food.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await Food.findByIdAndDelete(id);

    return res.status(200).json({ message: "Food item deleted successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const foodAvailability = async (req, res) => {
  const id = req.params;

  try {
    const foodItem = await Food.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    foodItem.isAvailable = !foodItem.isAvailable;

    await foodItem.save();

    res.status(200).send({ isAvailable: foodItem.isAvailable });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const addFoodTags = async (req, res) => {
  const foodId = req.params.id;
  const { tag } = req.body;

  try {
    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    if (food.foodTags.includes(tag)) {
      return res.status(400).json({ message: "Tag already exists." });
    }

    food.foodTags.push(tag);
    await food.save();

    res.status(201).json({ message: "Food tag added" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const addFoodAdditives = async (req, res) => {
  const foodId = req.params.id;
  const { additive } = req.body;

  try {
    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    if (food.additives.includes(additive)) {
      return res.status(400).json({ message: "Additive already exists." });
    }

    food.additives.push(additive);
    await food.save();

    res.status(201).json({ message: "Food additive added" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
