export default (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      commentId: {
        field: "comment_id",
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
      },
      videoId: {
        field: "video_id",
        type: DataTypes.BIGINT,
      },
      comment: {
        field: "comment",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      schema: "data",
      tableName: "comments",
      timestamps: false,
    }
  );

  Comments.associate = function (model) {
    const { Users, Comments, Videos } = model;

    Comments.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Comments.belongsTo(Videos, {
      as: "Videos",
      foreignKey: "videoId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Comments;
};
