import { getAccessToken, verifyAccessToken } from "../utils/utils.js";
import { getUserCredentials } from "../services/user.js";

const sessionAuthenticate = async (req, res, next) => {
  try {
    const token = getAccessToken(req);
    const payload = verifyAccessToken(token);
    if (!payload?.email) return res.sendStatus(401);
    const userObj = await getUserCredentials(payload.email);
    if (
      !userObj?.email ||
      !userObj?.signedIn ||
      String(req?.body?.userId || req?.params?.userId) !== userObj?.userId
    ) {
      return res.sendStatus(404);
    }
    req.body.email = payload.email;
    next();
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export default sessionAuthenticate;
