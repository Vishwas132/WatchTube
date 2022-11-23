import db from "../models/index.js";

const addFavoriteById = async (body) => {
  try {
    const obj = await db.Favorites.create(body);
    return obj?.dataValues;
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

const getFavorites = async (userId) => {
  try {
    const obj = await db.Favorites.findAll({
      where: {
        userId: userId,
      },
      raw: true,
    });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

const removeFavoriteById = async ({ userId, videoId }) => {
  try {
    const obj = await db.Favorites.destroy({
      where: {
        userId: userId,
        videoId: videoId,
      },
    });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

export { addFavoriteById, getFavorites, removeFavoriteById };
