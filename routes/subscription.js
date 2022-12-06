import { Router } from "express";
import * as controller from "../controllers/subscription.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const subscription = Router();

subscription.post(
  "/subscribe",
  sessionAuthenticate,
  controller.subscribeChannel
);

subscription.post(
  "/unsubscribe",
  sessionAuthenticate,
  controller.unsubscribeChannel
);

export default subscription;
