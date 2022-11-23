import { Router } from "express";
import * as users from "../controllers/user.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const user = Router();

user.get("/profile/", sessionAuthenticate, users.getUserProfile);

user.post("/signup", users.signupUser);

user.delete("/delete", sessionAuthenticate, users.deleteUser);

export default user;
