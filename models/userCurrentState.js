export default (sequelize, Datatypes) => {
  const UserCurrentState = sequelize.define(
    "UserCurrentState",
    {
      userId: {
        field: "user_id",
        type: Datatypes.BIGINT,
        primaryKey: true,
      },
      currentStateId: {
        field: "current_state_id",
        type: Datatypes.BIGINT,
      },
    },
    {
      schema: "data",
      tableName: "user_current_state",
      timestamps: false,
    }
  );

  UserCurrentState.associate = function (model) {
    const { Users, UserStates } = model;
    UserCurrentState.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    UserCurrentState.belongsTo(UserStates, {
      as: "CurrentState",
      foreignKey: "currentStateId",
      onDelete: "CASCADE",
    });
  };

  return UserCurrentState;
};
