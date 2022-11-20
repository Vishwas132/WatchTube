export default (sequelize, DataTypes) => {
  const Videos = sequelize.define(
    "Videos",
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
      videoTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "video_title",
      },
      videoUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "video_url",
      },
      likesCount: {
        type: DataTypes.BIGINT,
        default: 0,
        field: "likes_count",
      },
      dislikesCount: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        field: "dislikes_count",
      },
      commentsCount: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        field: "comments_count",
      },
      createdOn: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        field: "created_on",
      },
    },
    {
      schema: "data",
      tableName: "videos",
      timestamps: false,
    }
  );

  Videos.associate = function (model) {
    const { Users, Videos, Comments, Favorites } = model;

    Videos.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Videos.hasMany(Comments, {
      as: "Comments",
      foreignKey: "videoId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Videos.hasMany(Favorites, {
      as: "Favorites",
      foreignKey: "videoId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Videos;
};
