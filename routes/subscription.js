import { Router } from "express";
import * as controller from "../controllers/subscription.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const subscription = Router();

subscription.post("/subscribe", sessionAuthenticate, controller.subscribe);

subscription.post("/unsubscribe", sessionAuthenticate, controller.unsubscribe);

export default subscription;
