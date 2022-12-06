export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        field: "email",
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        field: "password_hash",
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      refreshToken: {
        field: "refresh_token",
        type: DataTypes.TEXT,
        unique: true,
      },
      signedIn: {
        field: "signed_in",
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      schema: "data",
      tableName: "users",
      timestamps: false,
    }
  );

  Users.associate = function (model) {
    const { UsersProfile, Comments, Favorites, Subscriptions, Channels } =
      model;

    Users.hasOne(UsersProfile, {
      as: "UsersProfile",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Users.hasMany(Comments, {
      as: "Comments",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Users.hasMany(Favorites, {
      as: "Favorites",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Users.hasMany(Subscriptions, {
      as: "Subscriptions",
      foreignKey: "subscriberId",
      onDelete: "CASCADE",
    });

    Users.hasOne(Channels, {
      as: "Channels",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Users;
};
