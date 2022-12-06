import { Router } from "express";
import * as comments from "../controllers/comment.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const comment = Router();

comment.get("/:videoId", comments.getCommentsByVideo);

comment.post("/", sessionAuthenticate, comments.postComment);

comment.delete("/delete", sessionAuthenticate, comments.deleteCommentById);

comment.put("/", sessionAuthenticate, comments.editCommentById);

// comment.put("/like", comments.likeComment);

// comment.put("/dislike", comments.dislikeComment);

export default comment;
