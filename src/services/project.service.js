const { Op } = require("sequelize");
const { Project, User } = require("../models");

async function createProject(payload) {
  const manager = await User.findByPk(payload.manager_id);

  if (!manager) {
    const error = new Error("Project manager not found");
    error.statusCode = 404;
    throw error;
  }

  if (payload.end_date < payload.start_date) {
    const error = new Error("End date cannot be earlier than start date");
    error.statusCode = 400;
    throw error;
  }

  const project = await Project.create({
    name: payload.name,
    description: payload.description,
    start_date: payload.start_date,
    end_date: payload.end_date,
    status: payload.status || "PLANNING",
    manager_id: payload.manager_id,
  });

  return await getProjectById(project.id);
}

 async function getAllProjects(query = {}) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;

  const where = {};

  if (query.search) {
    where[Op.or] = [
      {
        name: {
          [Op.like]: `%${query.search}%`,
        },
      },
      {
        description: {
          [Op.like]: `%${query.search}%`,
        },
      },
    ];
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.manager_id) {
    where.manager_id = query.manager_id;
  }

  const { rows, count } = await Project.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: "manager",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return {
    projects: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

async function getProjectById(id) {
  const project = await Project.findByPk(id, {
    include: [
      {
        model: User,
        as: "manager",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
        ],
      },
    ],
  });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
}

async function updateProject(id, payload) {
  const project = await Project.findByPk(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    payload.start_date &&
    payload.end_date &&
    payload.end_date < payload.start_date
  ) {
    const error = new Error("End date cannot be earlier than start date");
    error.statusCode = 400;
    throw error;
  }

  if (payload.manager_id) {
    const manager = await User.findByPk(payload.manager_id);

    if (!manager) {
      const error = new Error("Project manager not found");
      error.statusCode = 404;
      throw error;
    }
  }

  await project.update(payload);

  return await getProjectById(id);
}

async function deleteProject(id) {
  const project = await Project.findByPk(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  await project.destroy();

  return true;
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};