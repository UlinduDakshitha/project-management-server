const express = require("express");
const taskController = require("../controllers/task.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("../validators/task.validator");

const router = express.Router();

router.get(
  "/",
  authenticate,
  taskController.getTasks
);

router.get(
  "/:id",
  authenticate,
  taskController.getTask
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  createTaskValidator,
  taskController.createTask
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  updateTaskValidator,
  taskController.updateTask
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  taskController.deleteTask
);

module.exports = router;