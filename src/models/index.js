const Role = require("./Role");
const User = require("./User");
const Project = require("./Project");
const ProjectMember = require("./ProjectMember");
const Task = require("./Task");
const Comment = require("./Comment");
const ActivityLog = require("./ActivityLog");

/* ===========================
   Role <-> User
=========================== */

Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

/* ===========================
   Project Manager
=========================== */

User.hasMany(Project, {
  foreignKey: "manager_id",
  as: "managedProjects",
});

Project.belongsTo(User, {
  foreignKey: "manager_id",
  as: "manager",
});

/* ===========================
   Project <-> Members (Many to Many)
=========================== */

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

/* ===========================
   ProjectMember Relations
=========================== */

Project.hasMany(ProjectMember, {
  foreignKey: "project_id",
  as: "projectMembers",
});

ProjectMember.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

User.hasMany(ProjectMember, {
  foreignKey: "user_id",
  as: "projectMembers",
});

ProjectMember.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

/* ===========================
   Project <-> Task
=========================== */

Project.hasMany(Task, {
  foreignKey: "project_id",
  as: "tasks",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

/* ===========================
   User <-> Task
=========================== */

User.hasMany(Task, {
  foreignKey: "assigned_to",
  as: "assignedTasks",
});

Task.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignee",
});

/* ===========================
   Task <-> Comment
=========================== */

Task.hasMany(Comment, {
  foreignKey: "task_id",
  as: "comments",
});

Comment.belongsTo(Task, {
  foreignKey: "task_id",
  as: "task",
});

/* ===========================
   User <-> Comment
=========================== */

User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

/* ===========================
   Exports
=========================== */

User.hasMany(ActivityLog, {
  foreignKey: "user_id",
  as: "activities",
});

ActivityLog.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = {
  Role,
  User,
  Project,
  ProjectMember,
  Task,
  Comment,
  ActivityLog,
};