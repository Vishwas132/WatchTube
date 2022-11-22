import { Router } from "express";
import * as favoritesController from "../controllers/favoritesController.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const favorite = Router();

favorite.post("/", sessionAuthenticate, favoritesController.addFavorite);

favorite.get("/all", sessionAuthenticate, favoritesController.getAllFavorite);

favorite.delete("/", sessionAuthenticate, favoritesController.removeFavorite);

export default favorite;
