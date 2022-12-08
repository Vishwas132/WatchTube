import * as subscription from "../services/subscription.js";

const subscribe = async (req, res) => {
  try {
    const response = await subscription.subscribe(req.body);
    if (!response) return res.sendStatus(404);
    return res.status(200).json("Channel subscibed");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const unsubscribe = async (req, res) => {
  try {
    const response = await subscription.unsubscribe(req.body);
    if (!response) return res.sendStatus(404);
    return res.status(200).json("Channel subscibed");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export { subscribe, unsubscribe };
