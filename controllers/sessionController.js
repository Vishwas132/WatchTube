import * as session from "../services/session.js";

const signInUser = async (req, res) => {
  try {
    const refreshToken = await session.signIn(req.body);
    return res.status(200).json(refreshToken);
  } catch (error) {
    console.log("error", error);
    return res.status(401).json(error);
  }
};

const generateAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken === null) res.sendStatus(400);
    const token = await session.generateToken(refreshToken);
    if (token === undefined) return res.sendStatus(403);
    return res.status(200).json({ accessToken: token });
  } catch (error) {
    console.log("error", error);
    return res.status(401).json(error);
  }
};

const signOutUser = async (req, res) => {
  try {
    const { email } = req.body;
    await session.signOut(email);
    return res.status(200).json("User signed out");
  } catch (error) {
    console.log("error", error);
    return res.status(401).json(error);
  }
};

export { signInUser, generateAccessToken, signOutUser };
