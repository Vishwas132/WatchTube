export default (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
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
      videoId: {
        field: "video_id",
        type: DataTypes.BIGINT,
        references: {
          model: "Videos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "comment",
      },
      createdOn: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        field: "created_on",
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
