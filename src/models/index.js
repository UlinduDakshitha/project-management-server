const Role = require("./Role");
const User = require("./User");

// One Role -> Many Users
Role.hasMany(User, {
  foreignKey: "role_id",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
});

module.exports = {
  Role,
  User,
};