// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const studentAssignmentSchema = new Schema({

    studentId: {
        type: Schema.ObjectId,
        ref: 'studentModel',
    },
    assignmentId:{
        type: Schema.ObjectId,
        ref: 'assignmentModel',
    },
    attachments:{
        type: [String],
        minItems: 0,
        maxItems: 5,
        default: [],
    },
    subjectId: {
        type: Schema.ObjectId,
        ref: 'subjectModel',
    },
    teacherId: {
        type: Schema.ObjectId,
        ref: 'teacherModel',
    },
    publishedAt: {
        type: Date,
        required:true
    },
    submittedAt: {
        type: Date,
        
    },
    status: {
        type: String,
        default: 'PENDING',
    },
    isCompleted: {
        type: Boolean,
        default: false,
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

const studentAssignmentModel = db.mongoose.model("studentAssignmentModel", studentAssignmentSchema, "studentAssignmentMap");
module.exports = studentAssignmentModel;
