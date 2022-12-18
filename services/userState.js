import db from "../models/index.js";

async function getUserState(userId) {
  try {
    let stateObj = await db.UserCurrentState.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: db.UserStates,
          as: "CurrentState",
          required: true,
        },
      ],
    });
    stateObj = stateObj?.[0]?.dataValues;
    const newStateObj = stateObj?.CurrentState?.dataValues;
    stateObj.stateName = newStateObj?.stateName;
    return stateObj;
  } catch (error) {
    console.trace("error", error);
  }
}

async function createUserState(userId) {
  try {
    const stateObj = await db.UserCurrentState.create({
      userId: userId,
      currentStateId: 1,
    });
    return stateObj;
  } catch (error) {
    console.trace("error", error);
  }
}

async function updateUserState(userId, currentStateId) {
  try {
    const stateObj = await db.UserCurrentState.update(
      {
        currentStateId: currentStateId,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    return stateObj;
  } catch (error) {
    console.trace("error", error);
  }
}

export { getUserState, createUserState, updateUserState };
