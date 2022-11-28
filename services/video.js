import db from "../models/index.js";

const newVideo = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.create(body, { transaction: t });
      await db.UsersProfile.increment(
        "videosCount",
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
    throw "Error while querying database";
  }
};

const getAllVideos = async () => {
  try {
    const obj = await db.Videos.findAll();
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const getVideo = async (id) => {
  try {
    const obj = await db.Videos.findByPk(id);
    return obj?.dataValues;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const deleteVideo = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.destroy(
        {
          where: {
            id: body.id,
          },
        },
        { transaction: t }
      );
      await db.UsersProfile.decrement(
        "videosCount",
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
    throw "Error while querying database";
  }
};

const likeVideo = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.increment(
        "likesCount",
        {
          where: { id: body.id },
          plain: true,
        },
        { transaction: t }
      );
      await db.UsersProfile.increment(
        "likesCount",
        {
          where: {
            userId: body.userId,
          },
        },
        { transaction: t }
      );
      return obj[0][0];
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const dislikeVideo = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.increment(
        "dislikesCount",
        {
          where: { id: body.id },
          plain: true,
        },
        { transaction: t }
      );
      await db.UsersProfile.increment(
        "dislikesCount",
        {
          where: {
            userId: body.userId,
          },
        },
        { transaction: t }
      );
      return obj[0][0];
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

export {
  newVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
};
