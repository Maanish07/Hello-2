import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  table: {
    type: Number,
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

    default: [],
  },
  user_Id: {
    type: String,
  },
  payment_id: {
    type: String,
  },
  order_id: {
    type: String,
  },
  signature: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
