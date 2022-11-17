import { Router } from "express";
import * as sessionController from "../controllers/sessionController.js";

const session = Router();

session.get("/", sessionController.getToken);

session.post("/", sessionController.createToken);

export default session;
