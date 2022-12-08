import {
  createAccessToken,
  createRefreshToken,
  verifyPassword,
  verifyRefreshToken,
} from "../utils/utils.js";
import db from "../models/index.js";
import { getUserCredentials } from "./user.js";

const signInUser = async (body) => {
  try {
    const { email, password } = body;
    const { userId, passwordHash } = await getUserCredentials(email);
    if (passwordHash === undefined) throw "User not registered";
    const isRegistered = await verifyPassword(password, passwordHash);
    if (!isRegistered) throw "Email or password wrong";
    const tokenObj = createAccessToken({ email });
    const refreshToken = createRefreshToken({ email });
    await updateRefreshToken(userId, refreshToken);
    return {
      userId: userId,
      accessToken: tokenObj.accessToken,
      accessTokenExpiry: tokenObj.accessTokenExpiry,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.trace("error", error);
    throw error;
  }
};

const updateRefreshToken = async (userId, refreshToken) => {
  try {
    await db.Users.update(
      {
        refreshToken: refreshToken,
        signedIn: true,
      },
      {
        where: { userId: userId },
      }
    );
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const generateAccessToken = async (refreshToken) => {
  try {
    const userObj = await db.Users.findAll({
      where: {
        refreshToken: refreshToken,
      },
      raw: true,
    });
    const payload = verifyRefreshToken(refreshToken);
    if (!payload?.email || !userObj?.[0]?.email) return;

    const token = createAccessToken({ email: payload.email });
    return {
      accessToken: token.accessToken,
      accessTokenExpiry: token.accessTokenExpiry,
    };
  } catch (error) {
    console.trace("error", error);
    throw error.message;
  }
};

const signOutUser = async (userId) => {
  try {
    const obj = await db.Users.update(
      {
        refreshToken: null,
        signedIn: false,
      },
      {
        where: { userId: userId },
      }
    );
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

export { signInUser, generateAccessToken, signOutUser };
