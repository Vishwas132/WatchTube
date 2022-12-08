import * as video from "../services/video.js";
import sendMail from "../services/mail.js";
import { getSubscribers } from "../services/subscription.js";
import fs from "fs/promises";
import path from "path";
import { createReadStream } from "fs";
import { getChannelInfo, getProfileById } from "../services/user.js";

const uploadVideo = async (req, res) => {
  try {
    req.body.videoUrl = req.file.filename;
    const obj = await getChannelInfo(req.body.channelId);
    if (obj.channelId !== req.body.channelId) return res.sendStatus(404);

    const videoObj = await video.newVideo(req.body);
    const subscribers = await getSubscribers(req.body.channelId);
    if (subscribers?.[0]?.dataValues?.subscriberId) {
      let emails = [];
      subscribers?.forEach(async (subscriber) => {
        const { email } = await getProfileById(
          subscriber?.dataValues?.subscriberId
        );
        emails.push(email);
      });
      const messageIds = await sendMail(emails);
      if (!messageIds) return req.sendStatus(404);
    }
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
    const { videoId } = req.params;
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const videoObj = await video.getVideo(videoId);
    if (!videoObj) return res.sendStatus(404);

    // get video stats
    const videoPath = path.resolve(
      process.cwd() + `/files/uploads/${videoObj.videoUrl}`
    );
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
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const deleteVideoById = async (req, res) => {
  try {
    const videoObj = await video.deleteVideo(req.body);
    if (!videoObj) return res.sendStatus(404);
    return res.status(200).json(`Video with id=${req.body.videoId} deleted`);
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const likeVideoById = async (req, res) => {
  try {
    const likedObj = await video.likeVideo(req.body);
    if (!likedObj?.videoId) return res.sendStatus(404);
    return res.status(200).json(`Video liked`);
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const dislikeVideoById = async (req, res) => {
  try {
    const dislikedObj = await video.dislikeVideo(req.body);
    if (!dislikedObj?.videoId) return res.sendStatus(404);
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
