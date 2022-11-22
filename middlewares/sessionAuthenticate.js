import { getToken, verifyAccessToken } from "../utils/utils.js";
import { getProfileById } from "../services/users.js";

const sessionAuthenticate = async (req, res, next) => {
  try {
    const accessToken = getToken(req);
    const payload = verifyAccessToken(accessToken);
    console.log("payload", payload);
    if (payload?.email === undefined) throw "Invalid token";
    const userObj = await getProfileById(payload.email);
    if (userObj?.email === undefined) throw "Not found";
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ error: error });
  }
};

export default sessionAuthenticate;
