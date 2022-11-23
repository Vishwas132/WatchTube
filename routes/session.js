import { Router } from "express";
import * as sessions from "../controllers/session.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const session = Router();

session.get("/signin", sessions.signInUser);

session.get("/token", sessions.generateAccessToken);

session.put("/signout", sessionAuthenticate, sessions.signOutUser);

export default session;
