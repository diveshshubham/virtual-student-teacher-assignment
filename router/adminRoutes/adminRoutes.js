const express = require("express");
const router = express.Router();
const adminControler = require('../../controller/adminController/adminController')

//these routes are only for inserting test datas
let routes = (app) => {

    //to register user
    router.post("/admin/addSubject",
        (req, res) => {
            adminControler.addSubject(req, res)
        }
    );

    //to login user
    router.post("/admin/mapTeacherSubject",
        (req, res) => {
            adminControler.mapTeacherSuject(req, res)
        }
    );

    //user updoad user's personal media
    router.post("/admin/mapStudentTeacherSubject",
        (req, res) => {
            adminControler.mapTeacherStudent(req, res)
        }
    );

    app.use(router);
};
module.exports = routes;