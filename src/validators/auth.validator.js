const { body } = require("express-validator");

const registerValidator = [
  body("first_name").trim().notEmpty().withMessage("First name is required"),
  body("last_name").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phone").optional({ checkFalsy: true }).trim(),
  body("avatar").optional({ checkFalsy: true }).isURL().withMessage("Avatar must be a valid URL"),
  body("role")
    .optional({ checkFalsy: true })
    .isIn(["ADMIN", "PROJECT_MANAGER", "TEAM_MEMBER"])
    .withMessage("Role is invalid"),
];

const loginValidator = [
  body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
