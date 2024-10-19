import { Category } from "../models/category.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();

  res.status(200).send(categories);
};

export const getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRandomCategories = async (req, res) => {
  try {
    let categories = await Category.aggregate([
      { $match: { value: { $ne: "more" } } },
      { $sample: { size: 7 } },
    ]);

    console.log(categories)

    const moreCategories = await Category.findOne({ value: "more" });

    if (moreCategories) {
      categories.push(moreCategories);
    }

    console.log(moreCategories)

    res.status(200).send(categories);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { title, value, imageUrl } = req.body;

  try {
    const findCategory = await Category.findOne({ title });

    if (findCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ title, value, imageUrl });

    await newCategory.save();

    return res.status(200).json({ message: "Category saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { $new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).send({ message: "Category updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
