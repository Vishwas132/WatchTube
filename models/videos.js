export default (sequelize, DataTypes) => {
  const Videos = sequelize.define(
    "Videos",
    {
      videoId: {
        field: "video_id",
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      channelId: {
        field: "channel_id",
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      videoTitle: {
        field: "video_title",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      videoUrl: {
        field: "video_url",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likesCount: {
        field: "likes_count",
        type: DataTypes.BIGINT,
        default: 0,
      },
      dislikesCount: {
        field: "dislikes_count",
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      commentsCount: {
        field: "comments_count",
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      createdOn: {
        field: "created_on",
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      schema: "data",
      tableName: "videos",
      timestamps: false,
    }
  );

  Videos.associate = function (model) {
    const { Channels, Comments, Favorites } = model;

    Videos.belongsTo(Channels, {
      as: "Channels",
      foreignKey: "channelId",
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
