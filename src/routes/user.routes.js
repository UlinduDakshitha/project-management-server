const express = require("express");
const userController = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  createUserValidator,
  updateUserValidator,
} = require("../validators/user.validator");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  userController.getUsers
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  userController.getUser
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createUserValidator,
  userController.createUser
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateUserValidator,
  userController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  userController.deleteUser
);

module.exports = router;