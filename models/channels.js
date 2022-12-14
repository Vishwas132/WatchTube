export default (sequelize, DataTypes) => {
  const Channels = sequelize.define(
    "Channels",
    {
      channelId: {
        field: "channel_id",
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      channelName: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "channel_name",
      },
      description: {
        type: DataTypes.TEXT,
        field: "description",
      },
      subscribersCount: {
        type: DataTypes.BIGINT,
        default: 0,
        field: "subscribers_count",
      },
    },
    {
      schema: "data",
      tableName: "channels",
      timestamps: false,
    }
  );

  Channels.associate = function (model) {
    const { UsersProfile, Subscriptions, Videos } = model;

    Channels.belongsTo(UsersProfile, {
      as: "UsersProfile",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Channels.hasMany(Subscriptions, {
      as: "Subscriptions",
      foreignKey: "channelId",
      onDelete: "CASCADE",
    });

    Channels.hasMany(Videos, {
      as: "Videos",
      foreignKey: "channelId",
      onDelete: "CASCADE",
    });
  };

  return Channels;
};
