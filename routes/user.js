import { Router } from "express";
import * as users from "../controllers/user.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";
import multer from "multer";

const upload = multer();

const user = Router();

user.post("/profile/", sessionAuthenticate, users.getUserProfile);

user.post("/signup", upload.none(), users.signupUser);

user.delete("/delete", sessionAuthenticate, users.deleteUser);

user.post("/profile/report", sessionAuthenticate, users.generateUserReport);

export default user;
