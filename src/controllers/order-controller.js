import { Order } from "../models/order.js";

export const placeOrder = async (req, res) => {
  const order = req.body;

  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(201).json({ message: "Order saved successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId) // TODO: tis might throw error
      .populate({
        path: "userId",
        select: "username email phone",
      })
      .populate({
        path: "deliveryAddress",
        select: "AddressLine1 city state postalCode",
      })
      .populate({
        path: "restaurantId",
        select: "name location",
      })
      .populate({
        path: "driverId",
        select: "name, phone",
      });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    res.status(200).send(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }) // TODO: tis might throw error

      .populate({
        path: "restaurantId",
        select: "name location",
      })
      .populate({
        path: "driverId",
        select: "name, phone",
      });

    if (!orders) {
      res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rateOrder = async (req, res) => {
    const orderId = req.params.id
    const {ratings, feedback} = req.body

    try {

        const updateOrder = await Order.findByIdAndUpdate(
            {_id: orderId},
            {ratings: ratings, feedback: feedback},
            {$new: true}
        )

        if(!updateOrder) {
            res.status(404).json({ message: "Orders not found" });
        }

        res.status(200).json({message: "Ratings added successfully."})

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id
    const {status} = req.body

    try {

        const updateOrder = await Order.findByIdAndUpdate(
            {_id: orderId},
            {orderStatus: status},
            {$new: true}
        )

        if(!updateOrder) {
            res.status(404).json({ message: "Orders not found" });
        }

        res.status(200).json({message: "Order status updated successfully."})

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePaymentrStatus = async (req, res) => {
    const orderId = req.params.id
    const {paymentStatus} = req.body

    try {

        const updateOrder = await Order.findByIdAndUpdate(
            {_id: orderId},
            {paymentStatus: paymentStatus},
            {$new: true}
        )

        if(!updateOrder) {
            res.status(404).json({ message: "Orders not found" });
        }

        res.status(200).json({message: "Payment status updated successfully."})

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

