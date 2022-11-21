import {
  createToken,
  getPasswordHash,
  verifyPassword,
} from "../utils/utils.js";
import db from "../models/index.js";

const createNewUser = async (req) => {
  try {
    const { userId, token } = await newUser(req.body);
    await newUserProfile(userId, req.body);
    return { userId: userId, token: token };
  } catch (error) {
    throw { error };
  }
};

const signIn = async (body) => {
  try {
    const { email, password } = body;
    const { passwordHash } = await getUser(email);
    return await verifyPassword(password, passwordHash);
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

const getProfileById = async (userId) => {
  try {
    const obj = await db.UsersProfile.findAll({
      where: {
        userId: userId,
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
    const sessionToken = createToken({ email });
    const passwordHash = await getPasswordHash(password);
    const obj = await db.Users.create({ email, passwordHash, sessionToken });
    return { userId: obj.dataValues.id, token: sessionToken };
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

export { createNewUser, deleteUserById, getProfileById, signIn };
