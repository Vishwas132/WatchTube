import db from "../models/index.js";

const newComment = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Comments.create(body);
      await db.UsersProfile.increment("commentsCount", {
        where: {
          userId: body.userId,
        },
      });
      await db.Videos.increment("commentsCount", {
        where: {
          videoId: body.videoId,
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

const getComments = async (videoId) => {
  try {
    const obj = await db.Comments.findAll({
      where: {
        videoId: videoId,
      },
      raw: true,
    });
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const deleteComment = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Comments.destroy({
        where: {
          commentId: body.commentId,
        },
        returning: true,
      });
      await db.UsersProfile.decrement("commentsCount", {
        where: {
          userId: body.userId,
        },
      });
      await db.Videos.decrement("commentsCount", {
        where: {
          videoId: body.videoId,
        },
      });
      return obj;
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const editComment = async ({ commentId, ...body }) => {
  try {
    const obj = await db.Comments.update(body, {
      where: {
        commentId: commentId,
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
