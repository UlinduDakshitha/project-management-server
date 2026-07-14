const { body } = require("express-validator");

const createUserValidator = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone")
    .optional()
    .trim(),

  body("avatar")
    .optional()
    .trim(),

  body("role_id")
    .isInt()
    .withMessage("Role is required"),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

const updateUserValidator = [
  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),

  body("last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone")
    .optional()
    .trim(),

  body("avatar")
    .optional()
    .trim(),

  body("role_id")
    .optional()
    .isInt()
    .withMessage("Role must be valid"),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
};