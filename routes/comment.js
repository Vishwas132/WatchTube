import { Router } from "express";
import * as comments from "../controllers/comment.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const comment = Router();

comment.get("/:videoId", comments.getAllComments);

comment.post("/", sessionAuthenticate, comments.postComment);

comment.delete("/delete", sessionAuthenticate, comments.deleteComment);

comment.put("/", sessionAuthenticate, comments.editComment);

// comment.put("/like", comments.likeComment);

// comment.put("/dislike", comments.dislikeComment);

export default comment;
