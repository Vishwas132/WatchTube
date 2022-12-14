import db from "../models/index.js";
import { removeVideoFiles } from "../utils/utils.js";

const newVideo = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.create(body);
      await db.UsersProfile.increment("videosCount", {
        where: {
          userId: body.userId,
        },
      });
      return obj?.dataValues;
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const getAllVideos = async (offset = 0, limit = 10) => {
  try {
    const obj = await db.Videos.findAll({
      offset: offset,
      limit: limit,
      raw: true,
    });
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const getVideoById = async (videoId) => {
  try {
    const obj = await db.Videos.findByPk(videoId);
    return obj?.dataValues;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const deleteVideo = async (body) => {
  try {
    const videoUrl = (await getVideoById(body.videoId))?.videoUrl;
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.destroy({
        where: {
          videoId: body.videoId,
        },
      });
      if (obj) {
        await removeVideoFiles(videoUrl);
        await db.UsersProfile.decrement("videosCount", {
          where: {
            userId: body.userId,
          },
        });
      }
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
      const obj = await db.Videos.increment("likesCount", {
        where: {
          videoId: body.videoId,
        },
        plain: true,
      });
      await db.UsersProfile.increment("likesCount", {
        where: {
          userId: body.userId,
        },
      });
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
      const obj = await db.Videos.increment("dislikesCount", {
        where: {
          videoId: body.videoId,
        },
        plain: true,
      });
      await db.UsersProfile.increment("dislikesCount", {
        where: {
          userId: body.userId,
        },
      });
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
  getVideoById,
  deleteVideo,
  likeVideo,
  dislikeVideo,
};
