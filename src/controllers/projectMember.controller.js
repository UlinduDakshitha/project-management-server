const projectMemberService = require("../services/projectMember.service");

async function assignMember(req, res, next) {
  try {
    const result = await projectMemberService.assignMember(
      req.params.projectId,
      req.body.user_id
    );

    res.status(201).json({
      success: true,
      message: "Member assigned successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getProjectMembers(req, res, next) {
  try {
    const result = await projectMemberService.getProjectMembers(
      req.params.projectId
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function removeMember(req, res, next) {
  try {
    await projectMemberService.removeMember(
      req.params.projectId,
      req.params.userId
    );

    res.json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  assignMember,
  getProjectMembers,
  removeMember,
};