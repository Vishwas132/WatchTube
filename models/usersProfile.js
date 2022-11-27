export default (sequelize, DataTypes) => {
  const UsersProfile = sequelize.define(
    "UsersProfile",
    {
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "username",
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        field: "email",
      },
      videosCount: {
        type: DataTypes.BIGINT,
        default: 0,
        field: "videos_count",
      },
      commentsCount: {
        type: DataTypes.BIGINT,
        default: 0,
        field: "comments_count",
      },
      likesCount: {
        type: DataTypes.BIGINT,
        default: 0,
        field: "likes_count",
      },
      dislikesCount: {
        type: DataTypes.BIGINT,
        default: 0,
        field: "dislikes_count",
      },
      favoritesCount: {
        type: DataTypes.BIGINT,
        default: 0,
        field: "favorites_count",
      },
    },
    {
      schema: "data",
      tableName: "users_profile",
      timestamps: false,
    }
  );

  UsersProfile.associate = function (model) {
    const { Users, UsersProfile } = model;

    UsersProfile.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return UsersProfile;
};
