import * as user from "../services/user.js";
import config from "../config/default.json" assert { type: "json" };

const signupUser = async (req, res) => {
  try {
    const { refreshToken, ...userObj } = await user.createNewUser(req.body);
    res.cookie("sessionToken", refreshToken, {
      maxAge: config.app.sessionExpiresInMilliseconds,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    return res.status(200).json(userObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json({ error: error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const userObj = await user.getProfileById(email);
    if (userObj === undefined) return res.sendStatus(404);
    return res.status(200).json(userObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const userObj = await user.deleteUserById(userId);
    if (!userObj) return res.sendStatus(404);
    return res.status(200).json(`User ${userId} deleted`);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const generateUserReport = async (req, res) => {
  try {
    const pdf = await user.getPdfReport(req.body);
    if (!pdf) return res.sendStatus(404);
    // res.set({
    //   "Content-Type": "application/pdf",
    //   "Content-length": pdf.length,
    // });
    return res.status(200).sendFile(pdf);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

const getChannelInfo = async (req, res) => {
  try {
    const { channelId } = req.params;
    let channelObj = await user.channelInfo(channelId);
    if (channelObj === undefined) return res.sendStatus(404);
    if (channelObj.userId !== String(req.body.userId)) {
      let { userId, ...newChannelObj } = channelObj;
      channelObj = newChannelObj;
    }
    return res.status(200).json(channelObj);
  } catch (error) {
    console.trace("error", error);
    return res.status(500).json(error);
  }
};

export {
  getUserProfile,
  signupUser,
  deleteUser,
  generateUserReport,
  getChannelInfo,
};
