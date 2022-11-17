import { Router } from "express";
import * as userController from "../controllers/userController.js";

const user = Router();

user.get("/", userController.getUserInfo);

user.post("/signup", userController.registerUser);

user.post("/signin", userController.signInUser);

user.delete("/signout", userController.signOutUser);

export default user;
