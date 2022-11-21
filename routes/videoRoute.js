import { Router } from "express";
import * as videosController from "../controllers/videosController.js";
import upload from "../middlewares/videoUpload.js";

const video = Router();

video.get("/home", videosController.getVideos);

video.get("/:id", videosController.getVideoById);

video.post("/upload", upload.single("video"), videosController.uploadVideo);

video.delete("/:id", videosController.deleteVideoById);

video.put("/:id/like", videosController.likeVideoById);

video.put("/:id/dislike", videosController.dislikeVideoById);

export default video;
