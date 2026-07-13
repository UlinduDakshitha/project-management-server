await queryInterface.createTable("project_members", {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  project_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "projects",
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

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});