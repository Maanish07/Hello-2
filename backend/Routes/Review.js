import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

router.post("/review", async (req, res) => {
  try {
    const newReview = new Review({
      name: req.body.name,
      review: req.body.review,
      rating: req.body.rating,
    });

    const savedItem = await newReview.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error saving review", error });
  }
});

router.get("/review", async (req, res) => {
  try {
    const allReviews = await Review.find();
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
