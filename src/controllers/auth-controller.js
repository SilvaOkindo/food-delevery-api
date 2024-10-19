import { comparePassword } from "../helpers/compare-password.js";
import { hashPassword } from "../helpers/hash-password.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const user = req.body;

  console.log(req.body)
  
  try {
    const findUser = await User.findOne({ email: user.email });

    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = User(user);

    // hashing password
    newUser.password = hashPassword(newUser.password);

    await newUser.save();

     newUser.password = undefined;

    return res.status(201).json(newUser);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) res.status(404).json({ message: "User not found" });

    if (!comparePassword(password, findUser.password)) {
      res.status(400).json({ message: "Bad crediantials" });
    }

    const token = jwt.sign(
      {
        id: findUser._id,
        email: findUser.email,
        userType: findUser.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    return res.status(200).send({"token": token})


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
