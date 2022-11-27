import { Router } from "express";
import * as sessions from "../controllers/session.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";
import multer from "multer";

const upload = multer();

const session = Router();

session.post("/signin", upload.none(), sessions.signInUser);

session.post("/token", sessions.generateAccessToken);

session.put("/signout", sessionAuthenticate, sessions.signOutUser);

export default session;
