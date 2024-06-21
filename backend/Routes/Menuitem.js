import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Menuitem from "../models/Menuitem.js";

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
    console.log("heyyedshghdg");
  },
});

const upload = multer({ storage: storage });

router.post("/menuitem", upload.single("files"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    const newItem = new Menuitem({
      image: uploadResult.secure_url,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      veg: req.body.veg,
      bestsellers: req.body.bestsellers,
      qunatity: req.body.qunatity,
    });

    const savedItem = await newItem.save();
    console.log(savedItem);

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

router.get("/menuitem", async (req, res) => {
  try {
    const allMenuItems = await Menuitem.find();
    res.status(200).json(allMenuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;







// import express from 'express';
// const router = express.Router();
// import Menuitem from '../models/Menuitem.js'


// router.post('/menuitem', async (req, res) => {
//   try {
    
//     const newItem = new Menuitem({
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description,
//       veg:req.body.veg,
//       bestsellers:req.body.bestsellers,
//       sale:req.body.sale
//     });

    
//     const savedItem = await newItem.save();
//     console.log(savedItem)

//     res.status(201).json(savedItem); 
//   } 
//   catch (err) {
//     res.status(400).json({ message: err.message });
//   }


// });

// router.get('/menuitem' , async(req,res) =>{
//   try {
    
//     const allMenuItems = await Menuitem.find();
//     res.status(200).json(allMenuItems);
//   } 
//   catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;

