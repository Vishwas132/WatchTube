export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define(
    "Favorites",
    {
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      videoId: {
        field: "video_id",
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
    },
    {
      schema: "data",
      tableName: "favorites",
      timestamps: false,
    }
  );

  Favorites.associate = function (model) {
    const { Users, Favorites, Videos } = model;

    Favorites.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Favorites.belongsTo(Videos, {
      as: "Videos",
      foreignKey: "videoId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Favorites;
};
