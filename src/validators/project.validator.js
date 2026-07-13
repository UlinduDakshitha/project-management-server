const { body } = require("express-validator");

exports.createProjectValidator = [
  body("name")
    .notEmpty()
    .withMessage("Project name is required"),

  body("manager_id")
    .isInt()
    .withMessage("Manager is required"),

  body("start_date")
    .isDate(),

  body("end_date")
    .isDate(),
];