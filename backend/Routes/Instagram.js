import express from "express";
const router = express.Router();
import axios from "axios";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

router.get("/instagram", async (req, res) => {
  try {
    const userResponse = await axios.get(
      `https://graph.instagram.com/me?access_token=${ACCESS_TOKEN}`
    );

    const USER_ID = userResponse.data.id;

    const mediaResponse = await axios.get(
      `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${ACCESS_TOKEN}`
    );

    res.json(mediaResponse.data);
  } catch (err) {
    console.error("Error fetching Instagram data:", err.message);
    res.status(500).json({ message: "Error fetching Instagram data" });
  }
});

export default router;
