require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Project Management API Running"
    });
});

sequelize.authenticate()
.then(() => {
    console.log("✅ Database Connected");
})
.catch((err) => {
    console.log("❌ Database Connection Failed");
    console.log(err.message);
});
module.exports = app;