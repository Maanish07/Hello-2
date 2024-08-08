import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genrateToken } from "../middleware/Authmiddle.js";

const router = express.Router();

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      console.log("User Data", userData);
      if (!userData) {
        return res.status(400).json({ error: "Email is not valid" });
      }
      const secpass = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!secpass) {
        return res.status(400).json({ error: "Incorrect password" });
      }
      const user = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        id: userData._id,
      };

      const token = await genrateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.status(200).json({ success: true, token: token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.get("/login", async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
