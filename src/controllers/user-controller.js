import { User } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { $new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).send({message: "User updated successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
