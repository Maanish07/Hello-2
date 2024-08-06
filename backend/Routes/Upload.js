import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

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

router.post("/upload", upload.single("files"), async (req, res) => {
  const uploadResult = await cloudinary.uploader.upload(req.file.path);
  console.log(req.body);
  console.log(req.file);
  console.log(uploadResult);
  res.json({ message: "Successfully uploaded files" });
});

router.get("/upload", async (req, res) => {
  res.send("jelloo");
});

export default router;
