import { Router } from "express";
import * as commentsController from "../controllers/commentsController.js";

const comment = Router();

comment.get("/:id", commentsController.getCommentsByVideo);

comment.post("/", commentsController.postComment);

comment.delete("/:id", commentsController.deleteCommentById);

// comment.put("/like", commentsController.likeComment);

// comment.put("/dislike", commentsController.dislikeComment);

export default comment;
