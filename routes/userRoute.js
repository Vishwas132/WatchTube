import { Router } from "express";
import * as usersController from "../controllers/usersController.js";

const user = Router();

user.get("/profile/:id", usersController.getUserProfile);

user.post("/signup", usersController.signupUser);

// user.post("/signin", usersController.signInUser);

// user.delete("/signout", usersController.signOutUser);

user.delete("/delete", usersController.deleteUser);

export default user;
