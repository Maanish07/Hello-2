import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import mongodbURL from "./db.js";
import Signup from "./Routes/Signup.js";
import Menuitem from "./Routes/Menuitem.js";
import Item from "./Routes/Item.js";
import Expense from "./Routes/Expense.js";
import Login from "./Routes/Login.js";
import Upload from "./Routes/Upload.js";
import Order from "./Routes/Order.js";
import Payment from "./Routes/Payment.js";
import Pics from "./Routes/Testimonials.js";
import Review from "./Routes/Review.js";
import Instagram from "./Routes/Instagram.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
const mongodbURL = process.env.MONGODBURL;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", Signup);
app.use("/", Menuitem);
app.use("/", Item);
app.use("/", Expense);
app.use("/", Login);
app.use("/", Upload);
app.use("/", Order);
app.use("/", Payment);
app.use("/", Pics);
app.use("/", Review);
app.use("/", Instagram);

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose
    .connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((error) => {
      console.error("Error connecting to database:", error);
    });
});
