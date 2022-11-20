import db from "../models/index.js";

const newVideo = async (body) => {
  try {
    const obj = await db.Videos.create(body);
    return obj?.dataValues;
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

const getAllVideos = async () => {
  try {
    const obj = await db.Videos.findAll({ raw: true });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

const getVideo = async (id) => {
  try {
    const obj = await db.Videos.findByPk(id);
    return obj?.dataValues;
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

const deleteVideo = async (id) => {
  try {
    const obj = await db.Videos.destroy({
      where: {
        id: id,
      },
    });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

const likeVideo = async (id) => {
  try {
    const obj = await db.Videos.increment("likesCount", {
      where: { id: id },
      plain: true,
    });
    console.log("obj", obj[0][0]);
    return obj[0][0];
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

const dislikeVideo = async (id) => {
  try {
    const obj = await db.Videos.increment("dislikesCount", {
      where: { id: id },
      plain: true,
    });
    console.log("obj", obj[0][0]);
    return obj[0][0];
  } catch (error) {
    console.log("error", error);
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
