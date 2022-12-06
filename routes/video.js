import { Router } from "express";
import * as videos from "../controllers/video.js";
import upload from "../middlewares/videoUpload.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const video = Router();

video.get("/all", videos.getVideos);

video.get("/:videoId", videos.getVideoById);

video.post(
  "/upload",
  upload.single("video"),
  sessionAuthenticate,
  videos.uploadVideo
);

video.delete("/delete", sessionAuthenticate, videos.deleteVideoById);

video.put("/like", sessionAuthenticate, videos.likeVideoById);

video.put("/dislike", sessionAuthenticate, videos.dislikeVideoById);

export default video;
