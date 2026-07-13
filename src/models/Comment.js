const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    timestamps: true,
  }
);

module.exports = Comment;