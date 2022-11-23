import { Router } from "express";
import user from "./user.js";
import session from "./session.js";
import video from "./video.js";
import comment from "./comment.js";
import favorite from "./favorite.js";

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
