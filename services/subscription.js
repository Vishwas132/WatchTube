import db from "../models/index.js";
import { getChannelInfo } from "./user.js";

const getSubscribers = async (channelId) => {
  try {
    const obj = await db.Subscriptions.findAll({
      where: { channelId: channelId },
    });
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const subscribe = async (body) => {
  try {
    const channelData = await getChannelInfo(body.channelId);
    if (channelData.userId === String(body.userId)) return;
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Subscriptions.create({
        subscriberId: body.userId,
        channelId: body.channelId,
      });
      await db.UsersProfile.increment("subscribersCount", {
        where: {
          userId: channelData.userId,
        },
      });
      return obj?.dataValues;
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const unsubscribe = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Subscriptions.destroy({
        where: {
          channelId: body.channelId,
          subscriberId: body.userId,
        },
        returning: true,
      });
      await db.UsersProfile.decrement("subscribersCount", {
        where: {
          userId: body.userId,
        },
      });
      return obj;
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

export { subscribe, unsubscribe, getSubscribers };
