import { Router } from "express";
import * as favoritesController from "../controllers/favoritesController.js";

const favorite = Router();

favorite.post("/", favoritesController.addFavorite);

favorite.get("/all", favoritesController.getAllFavorite);

favorite.delete("/", favoritesController.removeFavorite);

export default favorite;
