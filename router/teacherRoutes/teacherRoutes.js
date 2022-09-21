const express = require("express");
const router = express.Router();
const { validateApiKey, validateTeacherToken } = require('../../middleware/index');
const teacherController = require('../../controller/index').teacherController;

let routes = (app) => {

    // teacher register
    router.post("/teacher/register",
        validateApiKey,
        (req, res) => {
            teacherController.register(req, res)
        }
    );

    // teacher login
    router.post("/teacher/login",
        validateApiKey,
        (req, res) => {
            teacherController.login(req, res)
        }
    );

    // teacher logout
    router.post("/teacher/logout",
        validateApiKey,
        validateTeacherToken,
        (req, res) => {
            teacherController.logout(req, res)
        }
    );
    app.use(router);
};
module.exports = routes;