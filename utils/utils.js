import jwt from "jsonwebtoken";
import jsonObj from "../config/default.json" assert { type: "json" };
import crypto from "crypto";
import util from "util";

const scrypt = util.promisify(crypto.scrypt);

const getPasswordHash = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedBuff = await scrypt(password, salt, 64);
  const hashedSaltPassword = hashedBuff.toString("hex") + ":" + salt;
  return hashedSaltPassword;
};

const verifyPassword = async (password, passwordHash) => {
  const [key, salt] = passwordHash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = await scrypt(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
};

const createAccessToken = (data) => {
  return jwt.sign(data, jsonObj.app.accessTokenSecretKey, {
    expiresIn: jsonObj.app.tokenExpireInSeconds,
  });
};

const createRefreshToken = (data) => {
  return jwt.sign(data, jsonObj.app.refreshTokenSecretKey);
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, jsonObj.app.accessTokenSecretKey);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, jsonObj.app.refreshTokenSecretKey);
};

const getToken = (req) => {
  try {
    let header = req.headers["x-access-token"] || req.headers["authorization"];
    if (header && header.startsWith("Bearer ")) {
      let accessToken = header.slice(7);
      return accessToken;
    } else {
      throw "Invalid Token";
    }
  } catch (error) {
    throw { error: "Invalid Token" };
  }
};

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  getToken,
  getPasswordHash,
  verifyPassword,
};
