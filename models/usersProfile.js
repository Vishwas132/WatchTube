export default (sequelize, DataTypes) => {
  const UsersProfile = sequelize.define(
    "UsersProfile",
    {
      id: {
        field: "id",
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
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
