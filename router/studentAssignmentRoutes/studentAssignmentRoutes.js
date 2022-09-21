const express = require("express");
const router = express.Router();
const { validateApiKey, validateStudentToken } = require('../../middleware/index');
const studentAssignnmentController = require('../../controller/index').studenAssignmentController

let routes = (app) => {

    //to get all asignments
    router.get("/student/assignment/getAll/:teacherId/:subjectId",
        validateApiKey,
        validateStudentToken,
        (req, res) => {
            studentAssignnmentController.getAssignments(req, res)
        }
    );

    //to get asignment by its id
    router.get("/student/assignment/:assignmentId",
        validateApiKey,
        validateStudentToken,
        (req, res) => {
            studentAssignnmentController.getAssignmentsById(req, res)
        }
    );

     //to get asignment's status
     router.get("/student/myAssignments/status",
     validateApiKey,
     validateStudentToken,
     (req, res) => {
         studentAssignnmentController.getAssignmentStatusList(req, res)
     }
 );

    //to submit an assignment
    router.put("/student/assignment/:assignmenMaptId",
        validateApiKey,
        validateStudentToken,
        (req, res) => {
            studentAssignnmentController.submitAssignment(req, res)
        }
    );

    app.use(router);
};
module.exports = routes;