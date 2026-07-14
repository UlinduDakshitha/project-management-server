const { body } = require("express-validator");

const createProjectValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required"),

  body("description")
    .optional()
    .trim(),

  body("start_date")
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be a valid date"),

  body("end_date")
    .notEmpty()
    .withMessage("End date is required")
    .isDate()
    .withMessage("End date must be a valid date"),

  body("manager_id")
    .notEmpty()
    .withMessage("Manager is required")
    .isInt()
    .withMessage("Manager ID must be an integer"),

  body("status")
    .optional()
    .isIn([
      "PLANNING",
      "IN_PROGRESS",
      "COMPLETED",
      "ON_HOLD",
    ])
    .withMessage("Invalid project status"),
];

const updateProjectValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Project name cannot be empty"),

  body("description")
    .optional()
    .trim(),

  body("start_date")
    .optional()
    .isDate()
    .withMessage("Start date must be a valid date"),

  body("end_date")
    .optional()
    .isDate()
    .withMessage("End date must be a valid date"),

  body("manager_id")
    .optional()
    .isInt()
    .withMessage("Manager ID must be an integer"),

  body("status")
    .optional()
    .isIn([
      "PLANNING",
      "IN_PROGRESS",
      "COMPLETED",
      "ON_HOLD",
    ])
    .withMessage("Invalid project status"),
];

module.exports = {
  createProjectValidator,
  updateProjectValidator,
};