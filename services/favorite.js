import db from "../models/index.js";

const addFavoriteById = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Favorites.create(body, { transaction: t });
      await db.UsersProfile.increment(
        "favoritesCount",
        {
          where: {
            userId: body.userId,
          },
        },
        { transaction: t }
      );
      return obj?.dataValues;
    });
    return result;
  } catch (error) {
    console.trace("error", error);
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
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const removeFavoriteById = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Favorites.destroy(
        {
          where: {
            userId: body.userId,
            videoId: body.videoId,
          },
        },
        { transaction: t }
      );
      await db.UsersProfile.decrement(
        "favoritesCount",
        {
          where: {
            userId: body.userId,
          },
        },
        { transaction: t }
      );
      return obj;
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

export { addFavoriteById, getFavorites, removeFavoriteById };
