import { getAccessToken, verifyAccessToken } from "../utils/utils.js";
import { getUserCredentials } from "../services/user.js";

const sessionAuthenticate = async (req, res, next) => {
  try {
    const token = getAccessToken(req);
    const payload = verifyAccessToken(token);
    if (!payload?.email) return res.sendStatus(401);
    let userId = req?.body?.userId;
    if (!userId) userId = req?.params?.userId;
    if (!userId) return res.sendStatus(400);
    const userObj = await getUserCredentials(payload.email);
    if (!userObj?.userId || !userObj?.signedIn) return res.sendStatus(404);
    req.body.email = payload.email;
    next();
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export default sessionAuthenticate;
