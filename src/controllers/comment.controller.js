const { validationResult } = require("express-validator");
const commentService = require("../services/comment.service");

function handleValidation(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }
}

async function createComment(req, res, next) {
  try {
    handleValidation(req);

    const payload = {
      ...req.body,
      user_id: req.user.id,
    };

    const result = await commentService.createComment(payload);

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getComments(req, res, next) {
  try {
    const result = await commentService.getComments(req.params.taskId);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function updateComment(req, res, next) {
  try {
    handleValidation(req);

    const result = await commentService.updateComment(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Comment updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    await commentService.deleteComment(req.params.id);

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};