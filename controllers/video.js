import * as video from "../services/video.js";

const uploadVideo = async (req, res) => {
  try {
    console.log("req", req.file);
    req.body.videoUrl = req.file.filename;
    const videoObj = await video.newVideo(req.body);
    return res.status(200).json(videoObj);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const getVideos = async (req, res) => {
  try {
    const videosObj = await video.getAllVideos();
    if (videosObj === undefined) throw Error("No video");
    return res.status(200).json(videosObj);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json(error.message);
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const videoObj = await video.getVideo(id);
    if (videoObj === undefined) throw Error("No video");
    return res.status(200).json(videoObj);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json(error.message);
  }
};

const deleteVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const videoObj = await video.deleteVideo(id);
    if (!videoObj) throw Error("No video");
    return res.status(200).json(`Video with id=${id} deleted`);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json(error.message);
  }
};

const likeVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const likedObj = await video.likeVideo(id);
    if (!likedObj?.id) throw Error("No video");
    return res.status(200).json(`Video liked`);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json(error.message);
  }
};

const dislikeVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const likedObj = await video.dislikeVideo(id);
    if (!likedObj?.id) throw Error("No video");
    return res.status(200).json(`Video disliked`);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json(error.message);
  }
};

export {
  uploadVideo,
  getVideos,
  getVideoById,
  deleteVideoById,
  likeVideoById,
  dislikeVideoById,
};
