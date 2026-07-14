const express = require("express");
const commentController = require("../controllers/comment.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createCommentValidator,
  updateCommentValidator,
} = require("../validators/comment.validator");

const router = express.Router();

router.get(
  "/task/:taskId",
  authenticate,
  commentController.getComments
);

router.post(
  "/",
  authenticate,
  createCommentValidator,
  commentController.createComment
);

router.put(
  "/:id",
  authenticate,
  updateCommentValidator,
  commentController.updateComment
);

router.delete(
  "/:id",
  authenticate,
  commentController.deleteComment
);

module.exports = router;