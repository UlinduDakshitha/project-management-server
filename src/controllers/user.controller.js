const { validationResult } = require("express-validator");
const userService = require("../services/user.service");

function handleValidation(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }
}

async function getUsers(req, res, next) {
  try {
    const result = await userService.getAllUsers(req.query);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const result = await userService.getUserById(req.params.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    handleValidation(req);

    const result = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    handleValidation(req);

    const result = await userService.updateUser(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
