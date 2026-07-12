const { Role } = require("../models");

const seedRoles = async () => {
  const roles = [
    {
      name: "Admin",
      description: "System Administrator",
    },
    {
      name: "Project Manager",
      description: "Manage Projects",
    },
    {
      name: "Team Member",
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
