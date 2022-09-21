const express = require("express");
const router = express.Router();
const { validateApiKey, validateStudentToken } = require('../../middleware/index');
const studentController = require('../../controller/index').studentController;

let routes = (app) => {

    // student register
    router.post("/student/register",
        validateApiKey,
        (req, res) => {
            studentController.register(req, res)
        }
    );

    // student login
    router.post("/student/login",
        validateApiKey,
        (req, res) => {
            studentController.login(req, res)
        }
    );

    // student logout
    router.post("/student/logout",
        validateApiKey,
        validateStudentToken,
        (req, res) => {
            studentController.logout(req, res)
        }
    );
    app.use(router);
};
module.exports = routes;