export default (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define(
    "Subscriptions",
    {
      channelId: {
        field: "channel_id",
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      subscriberId: {
        field: "subscriber_id",
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
    },
    {
      schema: "data",
      tableName: "subscriptions",
      timestamps: false,
    }
  );

  Subscriptions.associate = function (model) {
    const { Users, Channels } = model;

    Subscriptions.belongsTo(Users, {
      as: "Users",
      foreignKey: "subscriberId",
      onDelete: "CASCADE",
    });
    Subscriptions.belongsTo(Channels, {
      as: "Channels",
      foreignKey: "channelId",
      onDelete: "CASCADE",
    });
  };

  return Subscriptions;
};
