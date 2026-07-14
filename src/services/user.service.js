const bcrypt = require("bcryptjs");
const { User, Role } = require("../models");

async function getAllUsers() {
  return await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Role,
        as: "role",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
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