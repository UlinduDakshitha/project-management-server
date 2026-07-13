const { body } = require("express-validator");

exports.createTaskValidator = [
    body("title")
        .notEmpty(),

    body("project_id")
        .isInt(),

    body("assigned_to")
        .isInt(),

    body("due_date")
        .isDate(),
];