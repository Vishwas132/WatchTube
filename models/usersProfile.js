export default (sequelize, DataTypes) => {
  const UsersProfile = sequelize.define(
    "UsersProfile",
    {
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      username: {
        field: "username",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        field: "email",
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      videosCount: {
        field: "videos_count",
        type: DataTypes.BIGINT,
        default: 0,
      },
      commentsCount: {
        field: "comments_count",
        type: DataTypes.BIGINT,
        default: 0,
      },
      likesCount: {
        field: "likes_count",
        type: DataTypes.BIGINT,
        default: 0,
      },
      dislikesCount: {
        field: "dislikes_count",
        type: DataTypes.BIGINT,
        default: 0,
      },
      favoritesCount: {
        field: "favorites_count",
        type: DataTypes.BIGINT,
        default: 0,
      },
      subscribersCount: {
        field: "subscribers_count",
        type: DataTypes.BIGINT,
        default: 0,
      },
    },
    {
      schema: "data",
      tableName: "users_profile",
      timestamps: false,
    }
  );

  UsersProfile.associate = function (model) {
    const { Users, Channels } = model;

    UsersProfile.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    UsersProfile.hasOne(Channels, {
      as: "Channels",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return UsersProfile;
};
