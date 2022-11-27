import * as user from "../services/user.js";

const signupUser = async (req, res) => {
  try {
    const userObj = await user.createNewUser(req);
    res.cookie("sessionToken", tokenObj.refreshToken, {
      maxAge: 86400000,
      httpOnly: false,
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

export { getUserProfile, signupUser, deleteUser };
