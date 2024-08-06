import Razorpay from "razorpay";
import express from "express";
import crypto from "crypto";
import "dotenv/config";

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "7f0d5a91b04c6237a8e5",
    };
    console.log(options);
    instance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "SomeThing Went Wrong" });
      }
      console.log("order :", order);
      res.status(200).json({ data: order });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/payment", async (req, res) => {
  res.send("Hey Payment");
});

router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      user,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(sign)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      console.log("Payment successful", {
        cartItems,
        user,
        razorpay_order_id,
        razorpay_payment_id,
      });
      res.status(200).json({ message: "Payment successful" });
    } else {
      console.log("Invalid Signature");
      res.status(400).json({ message: "Invalid Signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.post("/verify", async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       cartItems,
//       user,
//       amount,
//     } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
//       .update(sign)
//       .digest("hex");

//     if (generated_signature === razorpay_signature) {
//       const newOrder = new Order({
//         name: user.name,
//         phone: user.phone,
//         table: user.table,
//         cartItems,
//         user_Id: user.id,
//         payment_id: razorpay_payment_id,
//         order_id: razorpay_order_id,
//         signature: razorpay_signature,
//         amount,
//       });

//       await newOrder.save();

//       console.log("Payment successful", {
//         cartItems,
//         user,
//         razorpay_order_id,
//         razorpay_payment_id,
//       });
//       res.status(200).json({ message: "Payment successful" });
//     } else {
//       console.log("Invalid Signature");
//       res.status(400).json({ message: "Invalid Signature" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.get("/verify", async (req, res) => {
  res.send("<h1>Hello</h1>");
});

export default router;
