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

const createToken = (data) => {
  return jwt.sign(data, jsonObj.app.secretKey, {
    expiresIn: jsonObj.app.tokenExpireInSeconds,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jsonObj.app.secretKey);
};

const getToken = (req) => {
  try {
    let header = req.headers["x-access-token"] || req.headers["authorization"];
    if (header && header.startsWith("Bearer ")) {
      let token = header.slice(7);
      return token;
    } else {
      throw "Invalid Token";
    }
  } catch (error) {
    throw { error: "Invalid Token" };
  }
};

export { createToken, verifyToken, getToken, getPasswordHash, verifyPassword };
