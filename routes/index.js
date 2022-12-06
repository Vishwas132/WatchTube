import { Router } from "express";
import user from "./user.js";
import session from "./session.js";
import video from "./video.js";
import comment from "./comment.js";
import favorite from "./favorite.js";
import subscription from "./subscription.js";

const route = Router();

route.get("/", (req, res) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

route.use("/user", user);

route.use("/session", session);

route.use("/video", video);

route.use("/comment", comment);

route.use("/favorite", favorite);

route.use("/subscription", subscription);

export default route;
