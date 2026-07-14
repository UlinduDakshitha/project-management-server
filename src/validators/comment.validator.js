const { body } = require("express-validator");

const createCommentValidator = [
  body("task_id")
    .isInt()
    .withMessage("Task is required"),

  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required"),
];

const updateCommentValidator = [
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required"),
];

module.exports = {
  createCommentValidator,
  updateCommentValidator,
};