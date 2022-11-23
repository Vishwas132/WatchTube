import { Router } from "express";
import * as videos from "../controllers/video.js";
import upload from "../middlewares/videoUpload.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const video = Router();

video.get("/home", videos.getVideos);

video.get("/:id", videos.getVideoById);

video.post(
  "/upload",
  sessionAuthenticate,
  upload.single("video"),
  videos.uploadVideo
);

video.delete("/:id", sessionAuthenticate, videos.deleteVideoById);

video.put("/:id/like", sessionAuthenticate, videos.likeVideoById);

video.put("/:id/dislike", sessionAuthenticate, videos.dislikeVideoById);

export default video;
