const { Task, Project, User } = require("../models");

async function createTask(payload) {
  const project = await Project.findByPk(payload.project_id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const user = await User.findByPk(payload.assigned_to);

  if (!user) {
    const error = new Error("Assigned user not found");
    error.statusCode = 404;
    throw error;
  }

  const task = await Task.create({
    title: payload.title,
    description: payload.description,
    project_id: payload.project_id,
    assigned_to: payload.assigned_to,
    priority: payload.priority || "MEDIUM",
    status: payload.status || "TODO",
    due_date: payload.due_date,
  });

  return await getTaskById(task.id);
}

async function getAllTasks() {
  return await Task.findAll({
    include: [
      {
        model: Project,
        as: "project",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "assignee",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

async function getTaskById(id) {
  const task = await Task.findByPk(id, {
    include: [
      {
        model: Project,
        as: "project",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "assignee",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
        ],
      },
    ],
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
}

async function updateTask(id, payload) {
  const task = await Task.findByPk(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (payload.project_id) {
    const project = await Project.findByPk(payload.project_id);

    if (!project) {
      const error = new Error("Project not found");
      error.statusCode = 404;
      throw error;
    }
  }

  if (payload.assigned_to) {
    const user = await User.findByPk(payload.assigned_to);

    if (!user) {
      const error = new Error("Assigned user not found");
      error.statusCode = 404;
      throw error;
    }
  }

  await task.update(payload);

  return await getTaskById(id);
}

async function deleteTask(id) {
  const task = await Task.findByPk(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  await task.destroy();

  return true;
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};