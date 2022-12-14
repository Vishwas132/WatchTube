import * as subscription from "../services/subscription.js";

const subscribeChannel = async (req, res) => {
  try {
    const response = await subscription.subscribeChannel(req.body);
    if (!response) return res.sendStatus(404);
    return res.status(200).json("Channel subscibed");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const unsubscribeChannel = async (req, res) => {
  try {
    const response = await subscription.unsubscribeChannel(req.body);
    if (!response) return res.sendStatus(404);
    return res.status(200).json("Channel subscibed");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const subscribeToNotifications = async (req, res) => {
  try {
    const subscriptionId = await subscription.subscribeToNotifications(
      req.body
    );
    if (!subscriptionId)
      return res.status(500).json("Cannot save Subscription");
    return res.status(200).json("Subscribed to notifications");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const unsubscribeToNotifications = async (req, res) => {
  try {
    const subscriptionId = await subscription.unsubscribeToNotifications(
      req.body
    );
    if (!subscriptionId)
      return res.status(500).json("Cannot save Subscription");
    return res.status(200).json("Subscribed to notifications");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export {
  subscribeChannel,
  unsubscribeChannel,
  subscribeToNotifications,
  unsubscribeToNotifications,
};
