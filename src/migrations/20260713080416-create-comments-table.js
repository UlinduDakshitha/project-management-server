await queryInterface.createTable("comments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  task_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "tasks",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});