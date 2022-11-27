import * as favorite from "../services/favorite.js";

const addFavorite = async (req, res) => {
  try {
    const { userId, videoId } = await favorite.addFavoriteById(req.body);
    if (!userId) return res.sendStatus(404);
    return res.status(200).json(`Video ${videoId} saved by user ${userId}`);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const getAllFavorite = async (req, res) => {
  try {
    const { userId } = req.body;
    const favoritesObj = await favorite.getFavorites(userId);
    return res.status(200).json(favoritesObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(400).json(error.message);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userObj = await favorite.removeFavoriteById(req.body);
    if (!userObj) return res.sendStatus(404);
    return res
      .status(200)
      .json(
        `Video ${req.body.videoId} removed from favorites for user ${req.body.userId}`
      );
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export { addFavorite, getAllFavorite, removeFavorite };
