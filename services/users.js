import {
  createAccessToken,
  createRefreshToken,
  getPasswordHash,
} from "../utils/utils.js";
import db from "../models/index.js";

const createNewUser = async (req) => {
  try {
    const { userId, accessToken, refreshToken } = await newUser(req.body);
    await newUserProfile(userId, req.body);
    return {
      userId: userId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    throw { error };
  }
};

const deleteUserById = async (userId) => {
  try {
    const obj = await db.Users.destroy({
      where: {
        id: userId,
      },
    });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

const getProfileById = async (email) => {
  try {
    const obj = await db.UsersProfile.findAll({
      where: {
        email: email,
      },
    });
    return obj?.[0]?.dataValues;
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

const newUser = async ({ email, password }) => {
  try {
    const accessToken = createAccessToken({ email });
    const refreshToken = createRefreshToken({ email });
    const passwordHash = await getPasswordHash(password);
    const obj = await db.Users.create({
      email,
      passwordHash,
      refreshToken: refreshToken,
    });
    return {
      userId: obj.dataValues.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

const newUserProfile = async (userId, ...body) => {
  try {
    const { username, email } = body[0];
    const obj = await db.UsersProfile.create({
      userId,
      username,
      email,
    });
    return obj;
  } catch (error) {
    console.log("error", error);
    throw "Db error while executing query";
  }
};

export { createNewUser, deleteUserById, getProfileById };
