import db from "../models/index.js";

const getSubscribers = async (channelId) => {
  try {
    const obj = await db.Subscriptions.findAll({
      where: { channelId: channelId },
      raw: true,
    });
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const subscribeChannel = async (body) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const obj = await db.Subscriptions.create({
        subscriberId: body.userId,
        channelId: body.channelId,
      });
      await db.UsersProfile.increment("subscribersCount", {
        where: {
          userId: body.userId,
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

const unsubscribeChannel = async (body) => {
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

const subscribeToNotifications = async (body) => {
  try {
    const subscription = JSON.stringify(body.subscription);
    const obj = await db.Subscriptions.update(
      {
        subscriptionData: subscription,
      },
      {
        where: {
          subscriberId: body.userId,
          channelId: body.channelId,
        },
      }
    );
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const unsubscribeToNotifications = async (body) => {
  try {
    const obj = await db.Subscriptions.update(
      {
        subscriptionData: null,
      },
      {
        where: {
          subscriberId: body.userId,
          channelId: body.channelId,
        },
      }
    );
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

export {
  subscribeChannel,
  unsubscribeChannel,
  getSubscribers,
  subscribeToNotifications,
  unsubscribeToNotifications,
};
