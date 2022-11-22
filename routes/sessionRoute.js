import { Router } from "express";
import * as sessionsController from "../controllers/sessionController.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const session = Router();

session.get("/signin", sessionsController.signInUser);

session.get("/token", sessionsController.generateAccessToken);

session.put("/signout", sessionAuthenticate, sessionsController.signOutUser);

export default session;
