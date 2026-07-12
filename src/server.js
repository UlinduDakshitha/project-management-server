const app = require("./app");
const sequelize = require("./config/database");
const seedRoles = require("./seeders/RoleSeeder");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("✅ Database Connected");

    await seedRoles();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log(err);
  }
}

startServer();