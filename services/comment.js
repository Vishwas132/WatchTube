import db from "../models/index.js";

const newComment = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Comments.create(body, { transaction: t });
      await db.UserProfile.increment(
        "commentsCount",
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
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const deleteComment = async (id) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Comments.destroy(
        {
          where: {
            id: id,
          },
          returning: true,
        },
        { transaction: t }
      );
      await db.UserProfile.decrement(
        "commentsCount",
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

const editComment = async (id, body) => {
  try {
    const obj = await db.Comments.update(body, {
      where: {
        id: id,
      },
      returning: true,
    });
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

export { newComment, getComments, deleteComment, editComment };
