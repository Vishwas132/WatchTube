import * as comment from "../services/comment.js";

const postComment = async (req, res) => {
  try {
    const commentObj = await comment.newComment(req.body);
    return res.status(200).json(commentObj);
  } catch (error) {
    console.log("error", error);
    return res.status(400).json(error);
  }
};

const getCommentsByVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const commentObj = await comment.getComments(id, req.body);
    if (commentObj?.[0] === undefined) throw Error("No comment");
    return res.status(200).json(commentObj);
  } catch (error) {
    console.log("error", error);
    return res.status(400).json(error.message);
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const commentObj = await comment.deleteComment(id);
    if (!commentObj) throw Error("No comment");
    return res.status(200).json(`Comment with id=${id} deleted`);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json(error.message);
  }
};

const editCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const commentObj = await comment.editComment(id, req.body);
    if (!commentObj[0]) throw Error("No comment");
    return res.status(200).json(`Comment with id=${id} edited`);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json(error.message);
  }
};

export { postComment, getCommentsByVideo, deleteCommentById, editCommentById };
