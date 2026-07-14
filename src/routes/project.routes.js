const express = require("express");
const projectController = require("../controllers/project.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createProjectValidator,
  updateProjectValidator,
} = require("../validators/project.validator");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

 router.post(
  "/",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  createProjectValidator,
  projectController.createProject
);

router.get(
  "/",
  authenticate,
  projectController.getProjects
);

router.get(
  "/:id",
  authenticate,
  projectController.getProject
);

 router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  updateProjectValidator,
  projectController.updateProject
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  projectController.deleteProject
);

module.exports = router;