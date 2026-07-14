const { body } = require("express-validator");

const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required"),

  body("description")
    .optional()
    .trim(),

  body("project_id")
    .isInt()
    .withMessage("Project is required"),

  body("assigned_to")
    .isInt()
    .withMessage("Assigned user is required"),

  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn(["TODO", "IN_PROGRESS", "DONE"])
    .withMessage("Invalid status"),

  body("due_date")
    .isDate()
    .withMessage("Valid due date is required"),
];

const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task title cannot be empty"),

  body("description")
    .optional()
    .trim(),

  body("project_id")
    .optional()
    .isInt()
    .withMessage("Project must be valid"),

  body("assigned_to")
    .optional()
    .isInt()
    .withMessage("Assigned user must be valid"),

  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn(["TODO", "IN_PROGRESS", "DONE"])
    .withMessage("Invalid status"),

  body("due_date")
    .optional()
    .isDate()
    .withMessage("Valid due date is required"),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
};