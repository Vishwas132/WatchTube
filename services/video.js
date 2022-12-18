import db from "../models/index.js";
import { removeVideoFiles } from "../utils/utils.js";
import { getChannelInfo, getUserProfile } from "../services/user.js";
// import sendMail from "../services/mail.js";
import { getSubscribers } from "../services/subscription.js";
import webpush from "web-push";
import { updateUserState } from "./userState.js";

const uploadVideo = async (body) => {
  try {
    const obj = await getChannelInfo(body.userId);
    if (obj.userId !== body.userId || !obj) throw new Error("Not Found");

    const videoObj = await upload(body);
    const profileObj = await getUserProfile(body.userId);
    if (profileObj.videosCount > 0 && profileObj.videosCount < 5) {
      await updateUserState(body.userId, 2);
    } else if (profileObj.videosCount >= 5) {
      await updateUserState(body.userId, 3);
    }
    const subscribers = await getSubscribers(body.channelId);
    if (subscribers?.[0]?.subscriberId) {
      // let emails = [];
      subscribers?.forEach(async (subscriber) => {
        // Get notification subscription details from database and send push notifications
        const payload = JSON.stringify(body);
        const subscription = JSON.parse(subscriber.subscriptionData);
        if (subscription) {
          const result = await webpush
            .sendNotification(subscription, payload)
            .catch(console.trace);
        }

        // const profile = await getUserProfile(subscriber?.subscriberId);
        // emails.push(profile.email);
      });
      // const messageIds = await sendMail(emails);
      // if (!messageIds) return res.sendStatus(404);
    }
    return videoObj;
  } catch (error) {
    console.trace("error", error);
    return error;
  }
};

const upload = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.create(body);
      await db.UsersProfile.increment("videosCount", {
        where: {
          userId: body.userId,
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

const getAllVideos = async (offset = 0, limit = 10) => {
  try {
    const obj = await db.Videos.findAll({
      offset: offset,
      limit: limit,
      raw: true,
    });
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const getVideoById = async (videoId) => {
  try {
    const obj = await db.Videos.findByPk(videoId);
    return obj?.dataValues;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const deleteVideo = async (body) => {
  try {
    const videoUrl = (await getVideoById(body.videoId))?.videoUrl;
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.destroy({
        where: {
          videoId: body.videoId,
        },
      });
      if (obj) {
        await removeVideoFiles(videoUrl);
        await db.UsersProfile.decrement("videosCount", {
          where: {
            userId: body.userId,
          },
        });
      }
      return obj;
    });

    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const likeVideo = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.increment("likesCount", {
        where: {
          videoId: body.videoId,
        },
        plain: true,
      });
      await db.UsersProfile.increment("likesCount", {
        where: {
          userId: body.userId,
        },
      });
      return obj[0][0];
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
  }
};

const dislikeVideo = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Videos.increment("dislikesCount", {
        where: {
          videoId: body.videoId,
        },
        plain: true,
      });
      await db.UsersProfile.increment("dislikesCount", {
        where: {
          userId: body.userId,
        },
      });
      return obj[0][0];
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Error while querying database";
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
