import jwt from "jsonwebtoken";
import jsonObj from "../config/default.json" assert { type: "json" };

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

export { createToken, verifyToken, getToken };
