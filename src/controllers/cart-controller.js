import { Cart } from "../models/cart.js";

export const addProductToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, totalPrice } = req.body;

  let count;
  //let newCart ={}

  try {
    const existingProduct = await Cart.findOne({ userId, productId });
    count = await Cart.countDocuments({ userId });

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice += totalPrice;
      await existingProduct.save();
    } else {
      const newCart = Cart({
        userId: userId,
        productId: productId,
        additives: req.body.additives,
        instruction: req.body.instruction,
        totalPrice: req.body.totalPrice,
        quantity: req.body.quantity,
      });
      await newCart.save();
      count = await Cart.countDocuments({ userId });
    }

    res.status(201).json({ count: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;
  let count;

  try {
    count = await Cart.countDocuments({ userId });

    const cartItem = await Cart.findById(itemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Cart.findByIdAndDelete(itemId);
    count = await Cart.countDocuments({ userId });

    return res.status(200).json({ cartCount: count });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

export const fetchUserCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const userCart = await Cart.find({ userId: userId }).populate({
      path: "productId",
      select: "title imageUrl restaurant rating ratingCount",
    });

    res.status(200).json({ cart: userCart });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user.id;

  let count;

  try {
    await Cart.deleteMany({ userId: userId });
    count = await Cart.countDocuments({ userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

export const getCartCount = async (req, res) => {
  const userId = req.user.id;

  try {
    const count = await Cart.countDocuments({ userId: userId });

    res.status(200).json({ count: count });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

export const decrementProductQty = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;

  let count;

  try {
    const cartItem = await Cart.find({ userId: userId, productId: productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const productPrice = cartItem.totalPrice / cartItem.quantity;

    if (cartItem > 1) {
      cartItem.quantity -= 1;
      cartItem.totalPrice -= productPrice;
    }

    if (cartItem === 1) {
      await cartItem.findByIdAndDelete({
        userId: userId,
        productId: productId,
      });
    }

    count = await Cart.countDocuments({ userId });

    await cartItem.save();
    return res
      .status(200)
      .json({
        message: "Cart item decremented successfully",
        cartCount: count,
      });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
