const bcrypt = require("bcryptjs");
const { User, Role } = require("../models");
const { generateToken } = require("../utils/jwt");

async function register(payload) {
  const existingUser = await User.findOne({ where: { email: payload.email } });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const role = await Role.findOne({
    where: { name: payload.role || "Team Member" },
  });

  if (!role) {
    const error = new Error("Role not found");
    error.statusCode = 400;
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
    role_id: role.id,
  });

  return buildAuthResponse(user, role);
}

async function login(email, password) {
  const user = await User.findOne({
    where: { email },
    include: [{ model: Role }],
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (user.status !== "ACTIVE") {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
    throw error;
  }

  return buildAuthResponse(user, user.Role);
}

async function getProfile(userId) {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
    include: [{ model: Role }],
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

function buildAuthResponse(user, role) {
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: role.name,
  });

  const userJson = user.toJSON();
  delete userJson.password;

  return {
    token,
    user: {
      ...userJson,
      Role: role,
    },
  };
}

module.exports = {
  register,
  login,
  getProfile,
};
