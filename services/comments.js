import db from "../models/index.js";

const newComment = async (body) => {
  try {
    const obj = await db.Comments.create(body);
    return obj?.dataValues;
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

const getComments = async (id) => {
  try {
    const obj = await db.Comments.findAll({
      where: {
        videoId: id,
      },
      raw: true,
    });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

const deleteComment = async (id) => {
  try {
    const obj = await db.Comments.destroy({
      where: {
        id: id,
      },
      returning: true,
    });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Error while querying database";
  }
};

export { newComment, getComments, deleteComment };
