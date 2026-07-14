const { Comment, Task, User } = require("../models");

async function createComment(payload) {
  const task = await Task.findByPk(payload.task_id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  const comment = await Comment.create({
    task_id: payload.task_id,
    user_id: payload.user_id,
    comment: payload.comment,
  });

  return await getCommentById(comment.id);
}

async function getComments(taskId) {
  return await Comment.findAll({
    where: { task_id: taskId },
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "first_name", "last_name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

async function getCommentById(id) {
  const comment = await Comment.findByPk(id, {
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "first_name", "last_name", "email"],
      },
    ],
  });

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  return comment;
}

async function updateComment(id, payload) {
  const comment = await Comment.findByPk(id);

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  await comment.update({
    comment: payload.comment,
  });

  return await getCommentById(id);
}

async function deleteComment(id) {
  const comment = await Comment.findByPk(id);

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  await comment.destroy();

  return true;
}

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};