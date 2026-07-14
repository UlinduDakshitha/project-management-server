const dashboardService = require("../services/dashboard.service");

async function getDashboard(req, res, next) {
  try {
    let result;

    switch (req.user.role.name) {
      case "ADMIN":
        result = await dashboardService.getAdminDashboard();
        break;

      case "PROJECT_MANAGER":
        result = await dashboardService.getManagerDashboard(req.user.id);
        break;

      case "TEAM_MEMBER":
        result = await dashboardService.getMemberDashboard(req.user.id);
        break;

      default:
        const error = new Error("Invalid user role");
        error.statusCode = 403;
        throw error;
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboard,
};