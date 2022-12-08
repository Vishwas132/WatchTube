import { Router } from "express";
import * as favorites from "../controllers/favorite.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const favorite = Router();

favorite.post("/", sessionAuthenticate, favorites.addFavorite);

favorite.get("/all", sessionAuthenticate, favorites.getAllFavorites);

favorite.delete("/", sessionAuthenticate, favorites.removeFavorite);

export default favorite;
