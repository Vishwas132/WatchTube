import { getToken, verifyToken } from "../utils/utils.js";
import { getUserById } from "../services/users.js";

const sessionAuthenticate = async (req, res, next) => {
  try {
    const token = getToken(req);
    const data = verifyToken(token);
    if (data && data?.email) {
      const userObj = await getUserById(data.email);
      if (userObj?.email) {
        next(data.exp);
      } else {
        throw {
          error: "email not registered",
        };
      }
    } else {
      throw {
        error: "Unable to verify token",
      };
    }
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ error: error });
  }
};

export default sessionAuthenticate;
