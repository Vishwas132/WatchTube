import * as session from "../services/session.js";
import { getRefreshToken } from "../utils/utils.js";
import config from "../config/default.json" assert { type: "json" };

const signInUser = async (req, res) => {
  try {
    const { refreshToken, ...tokenObj } = await session.signInUser(req.body);
    res.cookie("sessionToken", refreshToken, {
      maxAge: config.app.sessionExpiresInMilliseconds,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    return res.status(200).json(tokenObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(401).json(error);
  }
};

const generateAccessToken = async (req, res) => {
  try {
    const refreshToken = getRefreshToken(req.cookies);
    if (!refreshToken) return res.sendStatus(400);
    const tokenObj = await session.generateAccessToken(refreshToken);
    if (!tokenObj?.accessToken) return res.sendStatus(401);
    return res.status(200).json(tokenObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(401).json(error);
  }
};

const signOutUser = async (req, res) => {
  try {
    const signOutObj = await session.signOutUser(req.body.userId);
    if (!signOutObj[0]) return res.status(404);
    return res.status(200).json("Signed out");
  } catch (error) {
    console.trace("error", error);
    return res.status(401).json(error);
  }
};

export { signInUser, generateAccessToken, signOutUser };
