const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User, Role } = require("../models");

async function getAllUsers(query = {}) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.max(Number(query.limit) || 10, 1);
  const offset = (page - 1) * limit;

  const where = {};

  if (query.search) {
    where[Op.or] = [
      {
        first_name: {
          [Op.like]: `%${query.search}%`,
        },
      },
      {
        last_name: {
          [Op.like]: `%${query.search}%`,
        },
      },
      {
        email: {
          [Op.like]: `%${query.search}%`,
        },
      },
    ];
  }

  if (query.status) {
    where.status = query.status;
  }

  const { rows, count } = await User.findAndCountAll({
    where,
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Role,
        as: "role",
      },
    ],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    users: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

async function getUserById(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Role,
        as: "role",
      },
    ],
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

async function createUser(payload) {
  const existingUser = await User.findOne({
    where: { email: payload.email },
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const role = await Role.findByPk(payload.role_id);

  if (!role) {
    const error = new Error("Role not found");
    error.statusCode = 404;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: hashedPassword,
    phone: payload.phone,
    avatar: payload.avatar,
    role_id: payload.role_id,
    status: payload.status || "ACTIVE",
  });

  return await getUserById(user.id);
}

async function updateUser(id, payload) {
  const user = await User.findByPk(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  await user.update(payload);

  return await getUserById(id);
}

async function deleteUser(id) {
  const user = await User.findByPk(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await user.destroy();

  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
