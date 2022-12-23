import { Router } from "express";
import * as controller from "../controllers/video.js";
import upload from "../middlewares/videoUpload.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const video = Router();

video.get("/", controller.getVideoByQuery);

video.get("/all", controller.getAllVideos);

video.get("/id/:videoId", controller.getVideoById);

video.post(
  "/upload",
  upload.single("video"),
  sessionAuthenticate,
  controller.uploadVideo
);

video.delete("/delete", sessionAuthenticate, controller.deleteVideo);

video.put("/like", sessionAuthenticate, controller.likeVideo);

video.put("/dislike", sessionAuthenticate, controller.dislikeVideo);

export default video;
