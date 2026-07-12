const { validationResult } = require("express-validator");
const authService = require("../services/auth.service");

function handleValidation(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }
}

async function register(req, res, next) {
  try {
    handleValidation(req);
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    handleValidation(req);
    const result = await authService.login(req.body.email, req.body.password);

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.getProfile(req.user.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  me,
};
