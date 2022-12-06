import { subscribe, unsubscribe } from "../services/subscription.js";

const subscribeChannel = async (req, res) => {
  try {
    const response = await subscribe(req.body);
    if (!response) return res.sendStatus(404);
    return res.status(200).json("Channel subscibed");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const unsubscribeChannel = async (req, res) => {
  try {
    const response = await unsubscribe(req.body);
    if (!response) return res.sendStatus(404);
    return res.status(200).json("Channel subscibed");
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export { subscribeChannel, unsubscribeChannel };
