import { Router } from "express";
import * as commentsController from "../controllers/commentsController.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const comment = Router();

comment.get("/:id", commentsController.getCommentsByVideo);

comment.post("/", sessionAuthenticate, commentsController.postComment);

comment.delete(
  "/:id",
  sessionAuthenticate,
  commentsController.deleteCommentById
);

// comment.put("/like", commentsController.likeComment);

// comment.put("/dislike", commentsController.dislikeComment);

export default comment;
