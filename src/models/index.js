const Role = require("./Role");
const User = require("./User");
const ProjectMember = require("./ProjectMember");
const Task = require("./Task");

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

Project.hasMany(Task, {
    foreignKey: "project_id",
    as: "tasks",
});

Task.belongsTo(Project, {
    foreignKey: "project_id",
    as: "project",
});

User.hasMany(Task, {
    foreignKey: "assigned_to",
    as: "assignedTasks",
});

Task.belongsTo(User, {
    foreignKey: "assigned_to",
    as: "assignee",
});

 module.exports = {
  Role,
  User,
  Project,
  Task,
  ProjectMember,
};
 