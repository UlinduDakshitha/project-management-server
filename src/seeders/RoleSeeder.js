const { Role } = require("../models");

const seedRoles = async () => {
  const roles = [
    {
      name: "ADMIN",
      description: "System Administrator",
    },
    {
      name: "PROJECT_MANAGER",
      description: "Manage Projects",
    },
    {
      name: "TEAM_MEMBER",
      description: "Project Team Member",
    },
  ];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });
  }

  console.log("Roles seeded");
};

module.exports = seedRoles;
