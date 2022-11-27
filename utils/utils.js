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
  const token = jwt.sign(data, jsonObj.app.accessTokenSecretKey, {
    expiresIn: jsonObj.app.tokenExpireInSeconds,
  });
  const payload = jwt.decode(token);
  return {
    accessToken: token,
    accessTokenExpiry: payload.exp,
  };
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

const getRefreshToken = (req) => {
  return req.cookies.sessionToken;
};

const getAccessToken = (req) => {
  try {
    const header = req.headers["authorization"];
    if (header && header.startsWith("Bearer ")) {
      const token = header.slice(7);
      return token;
    } else {
      throw "Invalid Access token";
    }
  } catch (error) {
    throw "Invalid Token";
  }
};

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  getAccessToken,
  getRefreshToken,
  getPasswordHash,
  verifyPassword,
};
