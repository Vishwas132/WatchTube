import { Router } from "express";
import * as usersController from "../controllers/usersController.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const user = Router();

user.get("/profile/", sessionAuthenticate, usersController.getUserProfile);

user.post("/signup", usersController.signupUser);

user.delete("/delete", sessionAuthenticate, usersController.deleteUser);

export default user;
