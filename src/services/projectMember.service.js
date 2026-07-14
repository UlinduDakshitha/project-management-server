const { ProjectMember, Project, User } = require("../models");

async function assignMember(projectId, userId) {
  const project = await Project.findByPk(projectId);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const existing = await ProjectMember.findOne({
    where: {
      project_id: projectId,
      user_id: userId,
    },
  });

  if (existing) {
    const error = new Error("User is already assigned to this project");
    error.statusCode = 409;
    throw error;
  }

  await ProjectMember.create({
    project_id: projectId,
    user_id: userId,
  });

  return {
    message: "Member assigned successfully",
  };
}

async function getProjectMembers(projectId) {
  const project = await Project.findByPk(projectId);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return await ProjectMember.findAll({
    where: {
      project_id: projectId,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
        ],
      },
    ],
  });
}

async function removeMember(projectId, userId) {
  const member = await ProjectMember.findOne({
    where: {
      project_id: projectId,
      user_id: userId,
    },
  });

  if (!member) {
    const error = new Error("Project member not found");
    error.statusCode = 404;
    throw error;
  }

  await member.destroy();

  return true;
}

module.exports = {
  assignMember,
  getProjectMembers,
  removeMember,
};