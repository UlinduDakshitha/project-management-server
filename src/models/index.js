const Role = require("./Role");
const User = require("./User");

Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

module.exports = {
  Role,
  User,
};