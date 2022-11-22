import { Router } from "express";
import * as videosController from "../controllers/videosController.js";
import upload from "../middlewares/videoUpload.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const video = Router();

video.get("/home", videosController.getVideos);

video.get("/:id", videosController.getVideoById);

video.post(
  "/upload",
  sessionAuthenticate,
  upload.single("video"),
  videosController.uploadVideo
);

video.delete("/:id", sessionAuthenticate, videosController.deleteVideoById);

video.put("/:id/like", sessionAuthenticate, videosController.likeVideoById);

video.put(
  "/:id/dislike",
  sessionAuthenticate,
  videosController.dislikeVideoById
);

export default video;
