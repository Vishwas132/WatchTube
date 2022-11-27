import * as comment from "../services/comment.js";

const postComment = async (req, res) => {
  try {
    const commentObj = await comment.newComment(req.body);
    if (!commentObj.comment) return res.sendStatus(500);
    return res.status(200).json(commentObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const getCommentsByVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const commentObj = await comment.getComments(id);
    return res.status(200).json(commentObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const commentObj = await comment.deleteComment(req.body);
    if (!commentObj) return res.sendStatus(404);
    return res.status(200).json(`Comment with id=${id} deleted`);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const editCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const commentObj = await comment.editComment(id, req.body);
    if (!commentObj[0]) return res.sendStatus(404);
    return res.status(200).json(`Comment with id=${id} edited`);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export { postComment, getCommentsByVideo, deleteCommentById, editCommentById };
