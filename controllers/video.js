import * as video from "../services/video.js";
import fs from "fs/promises";
import { basename, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const videoObj = await video.getVideo(id);
    if (videoObj === undefined) throw Error("No video");

    // get video stats
    const videoPath =
      __dirname.slice(0, __dirname.length - 11) +
      "\\files\\uploads\\" +
      videoObj.videoUrl;
    const videoSize = (await fs.stat(videoPath)).size;

    // Parse Range
    // Example: "bytes=32324-"
    const chunkSize = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);

    // return res.status(200).json(videoObj);
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
