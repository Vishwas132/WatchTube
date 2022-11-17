import { Router } from "express";
import * as commentController from "../controllers/commentController.js";

const comment = Router();

comment.post("/:id", commentController.getCommentById);

comment.post("/", commentController.postComment);

comment.delete("/:id", commentController.deleteCommentById);

// comment.put("/like", commentController.likeComment);

// comment.put("/dislike", commentController.dislikeComment);

export default comment;
