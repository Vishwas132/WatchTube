import { Router } from "express";
import * as videosController from "../controllers/videosController.js";

const video = Router();

video.get("/home", videosController.getVideos);

video.get("/:id", videosController.getVideoById);

video.post("/upload", videosController.uploadVideo);

video.delete("/:id", videosController.deleteVideoById);

// video.get("/play/:id", videosController.playVideoById);

video.put("/:id/like", videosController.likeVideoById);

video.put("/:id/dislike", videosController.dislikeVideoById);

export default video;
