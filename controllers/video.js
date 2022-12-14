import * as video from "../services/video.js";
import sendMail from "../services/mail.js";
import { getSubscribers } from "../services/subscription.js";
import fs from "fs/promises";
import path from "path";
import { createReadStream } from "fs";
import { getChannelInfo, getUserProfile } from "../services/user.js";
import webpush from "web-push";

const uploadVideo = async (req, res) => {
  try {
    req.body.videoUrl = req.file.filename;
    const obj = await getChannelInfo(req.body.channelId);
    if (obj.channelId !== req.body.channelId) return res.sendStatus(404);

    const videoObj = await video.newVideo(req.body);
    const subscribers = await getSubscribers(req.body.channelId);
    if (!subscribers?.[0]?.subscriberId) return res.sendStatus(404);
    let emails = [];
    subscribers?.forEach(async (subscriber) => {
      // Get notification subscription details from database and send push notifications
      const payload = JSON.stringify(req.body);
      const subscription = JSON.parse(subscriber.subscriptionData);
      if (subscription) {
        const result = await webpush
          .sendNotification(subscription, payload)
          .catch(console.trace);
      }
      //
      const profile = await getUserProfile(
        subscriber?.dataValues?.subscriberId
      );
      emails.push(profile.email);
    });
    const messageIds = await sendMail(emails);
    if (!messageIds) return req.sendStatus(404);

    return res.status(200).json(videoObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const getAllVideos = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const videosObj = await video.getAllVideos(page, limit);
    // console.log("utc to localtime", new Date(videosObj[0].createdAt + " UTC"));
    return res.status(200).json(videosObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const getVideoById = async (req, res) => {
  try {
    // Check range header
    const range = req?.headers?.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const videoObj = await video.getVideoById(req?.params?.videoId);
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

const deleteVideo = async (req, res) => {
  try {
    const videoObj = await video.deleteVideo(req.body);
    if (!videoObj) return res.sendStatus(404);
    return res.status(200).json(`Video with id=${req.body.videoId} deleted`);
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const likeVideo = async (req, res) => {
  try {
    const likedObj = await video.likeVideo(req.body);
    if (!likedObj?.videoId) return res.sendStatus(404);
    return res.status(200).json(`Video liked`);
  } catch (error) {
    console.trace("error", error);
    return res.status(404).json(error.message);
  }
};

const dislikeVideo = async (req, res) => {
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
  getAllVideos,
  getVideoById,
  deleteVideo,
  likeVideo,
  dislikeVideo,
};
