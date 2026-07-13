await queryInterface.createTable("projects", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
  },

  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },

  end_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },

  status: {
    type: Sequelize.ENUM(
      "PLANNING",
      "IN_PROGRESS",
      "COMPLETED",
      "ON_HOLD"
    ),
    defaultValue: "PLANNING",
  },

  manager_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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