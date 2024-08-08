import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const genrateToken = (user) => {
  const payLoad = {
    name: user.name,
    _id: user.id,
    email: user.email,
    role: user.role,
  };
  console.log("this is payload", payLoad);
  return jwt.sign(payLoad, secretKey);
};

export const genrateRefreshToken = (user) => {
  const payLoad = {
    username: user.username,
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payLoad, secretKey, { expiresIn: "15d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
