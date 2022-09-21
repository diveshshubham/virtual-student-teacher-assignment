// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const notifQueueAssignSchema = new Schema({

    assignmentId:{
        type: Schema.ObjectId,
        ref: 'assignmentModel',
    },
    isAssgnmentPublished: {
        type: Boolean,
        default: false,
    },
    teacherId: {
        type: Schema.ObjectId,
        ref: 'teacherModel',
      },
    isNotified: {
        type: Boolean,
        default: false,
    },
    startDate:{
        type: Date,
    },
    endDate:{
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const notifQueueAssignmentModel = db.mongoose.model("notifQueueAssignmentModel", notifQueueAssignSchema, "assignmentNotifQueue");
module.exports = notifQueueAssignmentModel;
