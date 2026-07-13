const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM(
        "LOW",
        "MEDIUM",
        "HIGH"
      ),
      defaultValue: "MEDIUM",
    },

    status: {
      type: DataTypes.ENUM(
        "TODO",
        "IN_PROGRESS",
        "DONE"
      ),
      defaultValue: "TODO",
    },

    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

module.exports = Task;