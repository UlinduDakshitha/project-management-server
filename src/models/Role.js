const Role = require("./Role");
const User = require("./User");
const Project = require("./Project");

// Role -> User
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

// User -> Project (Manager)
User.hasMany(Project, {
  foreignKey: "manager_id",
  as: "managedProjects",
});

Project.belongsTo(User, {
  foreignKey: "manager_id",
  as: "manager",
});

module.exports = {
  Role,
  User,
  Project,
};