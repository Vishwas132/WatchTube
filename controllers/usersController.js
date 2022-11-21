import * as user from "../services/users.js";

const signupUser = async (req, res) => {
  try {
    const userObj = await user.createNewUser(req);
    return res.status(200).json(userObj);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error });
  }
};

const signInUser = async (req, res) => {
  try {
    const userSignedIn = await user.signIn(req.body);
    if (!userSignedIn) throw "Wrong email or password";
    return res.status(200).json("User signed in");
  } catch (error) {
    console.log("error", error);
    return res.status(401).json(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userObj = await user.getProfileById(id);
    if (userObj === undefined) throw Error("No user");
    return res.status(200).json({
      userProfile: userObj,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const userObj = await user.deleteUserById(userId);
    if (!userObj) throw Error("No user");
    return res.status(200).json(`User ${userId} deleted`);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

export { getUserProfile, signupUser, deleteUser, signInUser };
