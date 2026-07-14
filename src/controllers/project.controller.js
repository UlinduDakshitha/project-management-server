const { validationResult } = require("express-validator");
const projectService = require("../services/project.service");

function handleValidation(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }
}

async function createProject(req, res, next) {
  try {
    handleValidation(req);

    const result = await projectService.createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getProjects(req, res, next) {
  try {
    const result = await projectService.getAllProjects(req.query);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  try {
    const result = await projectService.getProjectById(req.params.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    handleValidation(req);

    const result = await projectService.updateProject(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    await projectService.deleteProject(req.params.id);

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};