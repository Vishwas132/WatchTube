import * as favorite from "../services/favorite.js";

const addFavorite = async (req, res) => {
  try {
    const { userId, videoId } = await favorite.addFavoriteById(req.body);
    if (!userId) throw Error("User or video not found");
    return res.status(200).json(`Video ${videoId} saved by user ${userId}`);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json(error);
  }
};

const getAllFavorite = async (req, res) => {
  try {
    const { userId } = req.body;
    const favoritesObj = await favorite.getFavorites(userId);
    if (favoritesObj?.[0] === undefined) throw Error("No user");
    return res.status(200).json(favoritesObj);
  } catch (error) {
    console.log("error", error);
    return res.status(400).json(error.message);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userObj = await favorite.removeFavoriteById(req.body);
    if (!userObj) throw Error("No user");
    return res
      .status(200)
      .json(
        `Video ${req.body.videoId} removed from favorites for user ${req.body.userId}`
      );
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

export { addFavorite, getAllFavorite, removeFavorite };
