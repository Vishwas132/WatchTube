import {
  createAccessToken,
  createRefreshToken,
  getPasswordHash,
} from "../utils/utils.js";
import db from "../models/index.js";
import puppeteer from "puppeteer";

const newUser = async (body, t) => {
  try {
    const { email, password } = body;
    const tokenObj = createAccessToken({ email });
    const refreshToken = createRefreshToken({ email });
    const passwordHash = await getPasswordHash(password);
    const obj = await db.Users.create(
      {
        email,
        passwordHash,
        refreshToken: refreshToken,
        signedIn: true,
      },
      { transaction: t }
    );
    return {
      userId: obj.dataValues.id,
      accessToken: tokenObj.accessToken,
      accessTokenExpiry: tokenObj.accessTokenExpiry,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const newUserProfile = async (userId, t, ...body) => {
  try {
    const { username, email } = body[0];
    const obj = await db.UsersProfile.create(
      {
        userId,
        username,
        email,
      },
      { transaction: t }
    );
    return obj;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const createNewUser = async (req) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const { userId, accessToken, accessTokenExpiry, refreshToken } =
        await newUser(req.body, t);
      await newUserProfile(userId, t, req.body);
      return {
        userId: userId,
        accessToken: accessToken,
        accessTokenExpiry: accessTokenExpiry,
        refreshToken: refreshToken,
      };
    });
    return result;
  } catch (error) {
    console.trace("error", error);
    throw error;
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
    console.trace("error", error);
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
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

const getPdfReport = async (req) => {
  try {
    const { pageUrl } = req.body;
    const browser = await puppeteer.launch({
      // headless: false,
      dumpio: true,
    });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "authorization": req.headers.authorization,
      "cookie": req.headers.cookie,
    });
    await page.setRequestInterception(true);
    page.on("request", async (request) => {
      // Do nothing in case of non-navigation requests.
      // if (!request.isNavigationRequest()) {
      //   request.continue();
      //   return;
      // }
      request.continue({
        "postData": JSON.stringify({ email: req.body.email }),
      });
    });

    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    // navigate to the website
    await page.goto(pageUrl, {
      waitUntil: "networkidle2",
    });

    await page.evaluate(() => {
      const nav = document.querySelector("nav");
      nav.remove();
    });
    const pdf = await page.pdf({
      // path: "files/reports/report.pdf",
      displayHeaderFooter: false,
      format: "a4",
    });
    await browser.close();
    return pdf;
  } catch (error) {
    console.trace("error", error);
    throw "Db error while executing query";
  }
};

export { createNewUser, deleteUserById, getProfileById, getPdfReport };
