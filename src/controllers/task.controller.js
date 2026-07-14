const { validationResult } = require("express-validator");
const taskService = require("../services/task.service");

function handleValidation(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }
}

async function createTask(req, res, next) {
  try {
    handleValidation(req);

    const result = await taskService.createTask(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getTasks(req, res, next) {
  try {
    const result = await taskService.getAllTasks();

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getTask(req, res, next) {
  try {
    const result = await taskService.getTaskById(req.params.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    handleValidation(req);

    const result = await taskService.updateTask(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Task updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id);

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};