import * as session from "../services/session.js";
import { getRefreshToken } from "../utils/utils.js";

const signInUser = async (req, res) => {
  try {
    const tokenObj = await session.signIn(req.body);
    res.cookie("sessionToken", tokenObj.refreshToken, {
      maxAge: 86400000,
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
    const refreshToken = getRefreshToken(req);
    if (!refreshToken) return res.sendStatus(400);
    const tokenObj = await session.generateToken(refreshToken);
    if (!tokenObj?.accessToken) return res.sendStatus(403);
    return res.status(200).json(tokenObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(401).json(error);
  }
};

const signOutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const signOutObj = await session.signOut(email);
    return res.status(200).json(signOutObj[0]);
  } catch (error) {
    console.trace("error", error);
    return res.status(401).json(error);
  }
};

export { signInUser, generateAccessToken, signOutUser };
