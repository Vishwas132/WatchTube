import { getAccessToken, verifyAccessToken } from "../utils/utils.js";
import { getUser } from "../services/session.js";

const sessionAuthenticate = async (req, res, next) => {
  try {
    const token = getAccessToken(req);
    const payload = verifyAccessToken(token);
    if (payload?.email === undefined) return res.sendStatus(401);
    const userObj = await getUser(payload.email);
    if (userObj?.email === undefined || userObj?.signedIn === false) {
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
