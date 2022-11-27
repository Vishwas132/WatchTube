export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        field: "email",
      },
      passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        field: "password_hash",
      },
      refreshToken: {
        type: DataTypes.TEXT,
        unique: true,
        field: "refresh_token",
      },
      signedIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "signed_in",
      },
    },
    {
      schema: "data",
      tableName: "users",
      timestamps: false,
    }
  );

  Users.associate = function (model) {
    const { Users, UsersProfile, Videos, Comments, Favorites } = model;

    Users.hasOne(UsersProfile, {
      as: "UsersProfile",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    Users.hasMany(Videos, {
      as: "Videos",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    Users.hasMany(Comments, {
      as: "Comments",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    Users.hasMany(Favorites, {
      as: "Favorites",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Users;
};
