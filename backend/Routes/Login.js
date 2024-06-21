import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "hello happy customer";

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
      if (!userData) {
        return res.status(400).json({ error: "email is not valid" });
      }
      const secpass = bcrypt.compare(req.body.password, userData.password);
      if (! secpass) {
        return res.status(400).json({ error: "incorrect Password" });
      } else {
        console.log("Logine",userData)
        const user = {
          name : userData.username,
          email : userData.email,
          id : userData.Id
        }
        const token = jwt.sign(
          { user},
          jwtSecret,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("token :",token);
        
        console.log("user registered", userData, userData.email);
        return res.status(200).json({ success: "true" , token : token });
      }

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