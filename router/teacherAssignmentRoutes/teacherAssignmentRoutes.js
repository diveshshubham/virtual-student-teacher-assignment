const express = require("express");
const router = express.Router();
const { validateApiKey, validateTeacherToken } = require('../../middleware/index');
const teacherAssignmentController = require('../../controller/index').teacherAssignmentController

let routes = (app) => {

    //to get all asignments
    router.get("/teacher/assignment/getAll",
        validateApiKey,
        validateTeacherToken,
        (req, res) => {
            teacherAssignmentController.getAssignMents(req, res)
        }
    );

    //to get asignment by its id 
    router.get("/teacher/assignment/:assignmentId",
        validateApiKey,
        validateTeacherToken,
        (req, res) => {
            teacherAssignmentController.getAssignmentsById(req, res)
        }
    );

       //to get asignment by its id where teacher can see list of all students with their status
       router.get("/teacher/assignment/status/:assignmentId",
       validateApiKey,
       validateTeacherToken,
       (req, res) => {
           teacherAssignmentController.getStudentStatusList(req, res)
       }
   );

    //to create an assignment
    router.post("/teacher/assignment/createAssignment",
        validateApiKey,
        validateTeacherToken,
        (req, res) => {
            teacherAssignmentController.createAssignment(req, res)
        }
    );
    //to edit and delte an assignment
    router.put("/teacher/assignment/editAssignment/:assignmentId",
        validateApiKey,
        validateTeacherToken,
        (req, res) => {
            teacherAssignmentController.updateAssignment(req, res)
        }
    );
    app.use(router);
};
module.exports = routes;