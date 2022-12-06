import * as session from "../services/session.js";
import { getRefreshToken } from "../utils/utils.js";

const signInUser = async (req, res) => {
  try {
    const { refreshToken, ...tokenObj } = await session.signIn(req.body);
    res.cookie("sessionToken", refreshToken, {
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
    const refreshToken = getRefreshToken(req.cookies);
    if (!refreshToken) return res.sendStatus(400);
    const tokenObj = await session.generateToken(refreshToken);
    if (!tokenObj?.accessToken) return res.sendStatus(401);
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
    if (!signOutObj[0]) return res.status(404);
    return res.status(200).json("Signed out");
  } catch (error) {
    console.trace("error", error);
    return res.status(401).json(error);
  }
};

export { signInUser, generateAccessToken, signOutUser };
