import { Router } from "express";
import comment from "./commentRoute.js";
import user from "./userRoute.js";
import video from "./videoRoute.js";
import favorite from "./favoriteRoute.js";

const route = Router();

route.get("/", (req, res) => {
  try {
    return res.status(200).json("success");
  } catch (error) {
    throw error;
  }
});

route.use("/user", user);

route.use("/video", video);

route.use("/comment", comment);

route.use("/favorite", favorite);

export default route;
