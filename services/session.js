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
    const { passwordHash } = await getUser(email);
    const isRegistered = await verifyPassword(password, passwordHash);
    if (!isRegistered) throw new Error("Email or password wrong");
    const accessToken = createAccessToken({ email });
    const refreshToken = createRefreshToken({ email });
    await db.Users.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: { email: email },
      }
    );
    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
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
    console.log("error", error);
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
    console.log("userObj", userObj[0]?.id);
    const payload = verifyRefreshToken(refreshToken);

    if (payload?.email === undefined || userObj?.[0]?.email === undefined)
      throw Error("Invalid token");

    const accessToken = createAccessToken({ email: payload.email });
    return accessToken;
  } catch (error) {
    console.log("error", error);
    throw error.message;
  }
};

const signOut = async (email) => {
  try {
    await db.Users.update(
      {
        refreshToken: null,
      },
      {
        where: { email: email },
      }
    );
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

export { signIn, generateToken, signOut };
