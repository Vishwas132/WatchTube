import {
  createAccessToken,
  createRefreshToken,
  verifyPassword,
  verifyRefreshToken,
} from "../utils/utils.js";
import db from "../models/index.js";

const signIn = async (body) => {
  try {
    const { email, password } = body;
    const { userId, passwordHash } = await getUser(email);
    if (passwordHash === undefined) throw "User not registered";
    const isRegistered = await verifyPassword(password, passwordHash);
    if (!isRegistered) throw "Email or password wrong";
    const tokenObj = createAccessToken({ email });
    const refreshToken = createRefreshToken({ email });
    await updateRefreshToken(email, refreshToken);
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

const getUser = async (email) => {
  try {
    const obj = await db.Users.findAll({
      where: {
        email: email,
      },
      raw: true,
    });
    return obj[0];
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const updateRefreshToken = async (email, refreshToken) => {
  try {
    await db.Users.update(
      {
        refreshToken: refreshToken,
        signedIn: true,
      },
      {
        where: { email: email },
      }
    );
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const generateToken = async (refreshToken) => {
  try {
    const userObj = await db.Users.findAll({
      where: {
        refreshToken: refreshToken,
      },
      raw: true,
    });
    const payload = verifyRefreshToken(refreshToken);
    if (payload?.email === undefined || userObj?.[0]?.email === undefined)
      return;

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

const signOut = async (email) => {
  try {
    const obj = await db.Users.update(
      {
        refreshToken: null,
        signedIn: false,
      },
      {
        where: { email: email },
      }
    );
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

export { signIn, generateToken, signOut, getUser };
