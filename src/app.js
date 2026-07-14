require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
require("./models");
const userRoutes = require("./routes/user.routes");
const projectMemberRoutes = require("./routes/projectMember.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectMemberRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Project Management API Running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    errors: err.errors,
  });
});

module.exports = app;
