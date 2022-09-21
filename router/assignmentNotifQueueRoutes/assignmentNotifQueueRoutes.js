//send reminder to teacher for publishing assignment if it's not published
//send student notification 1 day before approaching date
//when isPublished is false automaticlly publish it on day

const express = require("express");
const router = express.Router();
const { validateApiKey } = require('../../middleware/index');
const notifQueueController = require('../../controller/index').assignmentQueueNotifController

let routes = (app) => {

    // to remind teacher for publishing assignmnet
    router.get("/notify/teacher/reminder",
        validateApiKey,
        (req, res) => {
            notifQueueController.teacherReminder(req, res)
        }
    );

    // to auto publish the assignment
    router.get("/notify/autoPublish",
        validateApiKey,
        (req, res) => {
            notifQueueController.autoPublishAssignment(req, res)
        }
    );

    // remind student about end date
    router.get("/notify/endDate",
        validateApiKey,
        (req, res) => {
            notifQueueController.remindEndDate(req, res)
        }
    );
    app.use(router);
};
module.exports = routes;