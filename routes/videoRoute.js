import { Router } from "express";
import * as videoController from "../controllers/videoController.js";

const video = Router();

video.get("/", videoController.getVideos);

video.post("/:id", videoController.getVideoById);

video.post("/upload", videoController.uploadVideo);

video.delete("/:id", videoController.deleteVideoById);

video.put("/like", videoController.likeVideo);

video.put("/dislike", videoController.dislikeVideo);

export default video;
