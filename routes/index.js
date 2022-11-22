import { Router } from "express";
import user from "./userRoute.js";
import session from "./sessionRoute.js";
import video from "./videoRoute.js";
import comment from "./commentRoute.js";
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

route.use("/session", session);

route.use("/video", video);

route.use("/comment", comment);

route.use("/favorite", favorite);

export default route;
