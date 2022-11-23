import { Router } from "express";
import * as favorites from "../controllers/favorite.js";
import sessionAuthenticate from "../middlewares/sessionAuthenticate.js";

const favorite = Router();

favorite.post("/", sessionAuthenticate, favorites.addFavorite);

favorite.get("/all", sessionAuthenticate, favorites.getAllFavorite);

favorite.delete("/", sessionAuthenticate, favorites.removeFavorite);

export default favorite;
