import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// router.post("/order", async (req, res) => {
//   try {
//     const {
//       name,
//       phone,
//       table,
//       cartItems,
//       user_Id,
//       payment_id,
//       order_id,
//       signature,
//       amount,
//     } = req.body;

//     const newOrder = new Order({
//       name,
//       phone,
//       table,
//       cartItems,
//       user_Id,
//       payment_id,
//       order_id,
//       signature,
//       amount,
//     });

//     const savedOrder = await newOrder.save();
//     console.log(savedOrder);

//     res.status(201).json(savedOrder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.post("/order", async (req, res) => {
  try {
    const {
      name,
      phone,
      table,
      cartItems,
      user_Id,
      payment_id,
      order_id,
      signature,
      amount,
    } = req.body;

    if (
      !name ||
      !phone ||
      !table ||
      !cartItems ||
      !user_Id ||
      !payment_id ||
      !order_id ||
      !signature ||
      !amount
    ) {
      throw new Error("All fields are required");
    }

    const newOrder = new Order({
      name,
      phone,
      table,
      cartItems,
      user_Id,
      payment_id,
      order_id,
      signature,
      amount,
    });

    const savedOrder = await newOrder.save();
    console.log(savedOrder);

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/order", async (req, res) => {
  try {
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
