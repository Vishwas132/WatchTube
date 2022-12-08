import { Router } from "express";
import * as controller from "../controllers/user.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";
import multer from "multer";

const upload = multer();

const user = Router();

user.get("/profile/", sessionAuthenticate, controller.getUserProfile);

user.post("/signup", upload.none(), controller.signupUser);

user.delete("/delete", sessionAuthenticate, controller.deleteUser);

user.get("/profile/report", sessionAuthenticate, controller.generateUserReport);

user.post("/channel/:channelId", sessionAuthenticate, controller.channelInfo);

export default user;
