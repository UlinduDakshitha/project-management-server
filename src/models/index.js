const Role = require("./Role");
const User = require("./User");
const ProjectMember = require("./ProjectMember");

Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});
Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: "project_id",
  otherKey: "user_id",
  as: "members",
});

User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: "user_id",
  otherKey: "project_id",
  as: "projects",
});

 module.exports = {
  Role,
  User,
  Project,
  ProjectMember,
};
 