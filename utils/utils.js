import jwt from "jsonwebtoken";
import config from "config";
import crypto from "crypto";
import util from "util";
import fs from "fs/promises";

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
  const token = jwt.sign(data, config.get("app.accessTokenSecretKey"), {
    expiresIn: config.get("app.tokenExpiresInSeconds"),
  });
  const payload = jwt.decode(token);
  return {
    accessToken: token,
    accessTokenExpiry: payload.exp,
  };
};

const createRefreshToken = (data) => {
  return jwt.sign(data, config.get("app.refreshTokenSecretKey"));
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, config.get("app.accessTokenSecretKey"));
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.get("app.refreshTokenSecretKey"));
};

const getRefreshToken = (cookies) => {
  return cookies.sessionToken;
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

const removeVideoFiles = async (videoUrl) => {
  try {
    await fs.rm(`./../youtube/files/uploads/${videoUrl}`);
  } catch (error) {
    throw error;
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
  removeVideoFiles,
};
