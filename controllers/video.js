import * as video from "../services/video.js";

const uploadVideo = async (req, res) => {
  try {
    req.body.videoUrl = req.file.filename;
    const videoObj = await video.newVideo(req.body);
    return res.status(200).json(videoObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const getVideos = async (req, res) => {
  try {
    const videosObj = await video.getAllVideos();
    return res.status(200).json(videosObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const videoObj = await video.getVideo(id);
    if (videoObj === undefined) throw Error("No video");
    return res.status(200).json(videoObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const deleteVideoById = async (req, res) => {
  try {
    const videoObj = await video.deleteVideo(req.body);
    if (!videoObj) throw Error("No video");
    return res.status(200).json(`Video with id=${id} deleted`);
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const likeVideoById = async (req, res) => {
  try {
    const likedObj = await video.likeVideo(req.body);
    if (!likedObj?.id) throw Error("No video");
    return res.status(200).json(`Video liked`);
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const dislikeVideoById = async (req, res) => {
  try {
    const likedObj = await video.dislikeVideo(req.body);
    if (!likedObj?.id) throw Error("No video");
    return res.status(200).json(`Video disliked`);
  } catch (error) {
    console.trace("error", error);
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
