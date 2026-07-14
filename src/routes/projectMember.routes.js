const express = require("express");
const projectMemberController = require("../controllers/projectMember.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

router.post(
  "/:projectId/members",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  projectMemberController.assignMember
);

router.get(
  "/:projectId/members",
  authenticate,
  projectMemberController.getProjectMembers
);

router.delete(
  "/:projectId/members/:userId",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  projectMemberController.removeMember
);

module.exports = router;