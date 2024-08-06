import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Pics from "../models/Pics.js";
const router = express.Router();

(async function () {
  cloudinary.config({
    cloud_name: "dqwgwb6gd",
    api_key: "545327828194598",
    api_secret: "P8tO42xvnwW8Uou-cvkJgJbRLFI",
  });
})();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/pics", upload.single("files"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    const newItem = new Pics({
      image: uploadResult.secure_url,
    });

    const savedItem = await newItem.save();
    

    res.status(201).json(savedItem);

    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file:", req.file.path);
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });

    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file:", req.file.path);
      }
    });
  }
});
router.get("/pics", async (req, res) => {
  try {
    const allImages = await Pics.find();
    res.status(200).json(allImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
