const { User, Project, Task } = require("../models");

async function getAdminDashboard() {
  const totalUsers = await User.count();

  const totalProjects = await Project.count();

  const totalTasks = await Task.count();

  const completedTasks = await Task.count({
    where: {
      status: "DONE",
    },
  });

  const pendingTasks = await Task.count({
    where: {
      status: "TODO",
    },
  });

  const inProgressTasks = await Task.count({
    where: {
      status: "IN_PROGRESS",
    },
  });

  return {
    totalUsers,
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
  };
}

async function getManagerDashboard(userId) {
  const managedProjects = await Project.count({
    where: {
      manager_id: userId,
    },
  });

  const projects = await Project.findAll({
    where: {
      manager_id: userId,
    },
    attributes: ["id"],
  });

  const projectIds = projects.map((project) => project.id);

  const totalTasks = await Task.count({
    where: {
      project_id: projectIds,
    },
  });

  const completedTasks = await Task.count({
    where: {
      project_id: projectIds,
      status: "DONE",
    },
  });

  const pendingTasks = await Task.count({
    where: {
      project_id: projectIds,
      status: "TODO",
    },
  });

  const inProgressTasks = await Task.count({
    where: {
      project_id: projectIds,
      status: "IN_PROGRESS",
    },
  });

  return {
    managedProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
  };
}

async function getMemberDashboard(userId) {
  const assignedTasks = await Task.count({
    where: {
      assigned_to: userId,
    },
  });

  const completedTasks = await Task.count({
    where: {
      assigned_to: userId,
      status: "DONE",
    },
  });

  const pendingTasks = await Task.count({
    where: {
      assigned_to: userId,
      status: "TODO",
    },
  });

  const inProgressTasks = await Task.count({
    where: {
      assigned_to: userId,
      status: "IN_PROGRESS",
    },
  });

  return {
    assignedTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
  };
}

module.exports = {
  getAdminDashboard,
  getManagerDashboard,
  getMemberDashboard,
};