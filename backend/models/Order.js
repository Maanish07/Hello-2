import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  table: {
    type: Number,
    required: true,
  },
  cartItems: {
    type: [
      {
        id: String,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    required: true,
    default: [],
  },
  user_Id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
