export default (sequelize, Datatypes) => {
  const UserStates = sequelize.define(
    "UserStates",
    {
      stateId: {
        field: "state_id",
        type: Datatypes.BIGINT,
        primaryKey: true,
      },
      stateName: {
        field: "state_name",
        type: Datatypes.TEXT,
        allowNull: false,
      },
    },
    {
      schema: "data",
      tableName: "user_states",
      timestamps: false,
    }
  );

  UserStates.associate = function (model) {
    const { UserCurrentState } = model;

    UserStates.hasOne(UserCurrentState, {
      as: "CurrentState",
      foreignKey: "currentStateId",
      onDelete: "CASCADE",
    });
  };

  return UserStates;
};
