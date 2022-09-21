// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const assignmentSchema = new Schema({
    subjectId: {
        type: Schema.ObjectId,
        ref: 'subjectModel',
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'teacherModel',
    },
    assignmentTitle: {
        type: String,
        default: 'Assignment ',
    },
    description: {
        type: String,
        default: 'assignment description',
    },
    attachments:{
        type: [String],
        minItems: 0,
        maxItems: 5,
        default: [],
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    startDate: {
        type: Date,
        required:true
    },
    endDate: {
        type: Date,
        required:true
    },
    isDeleted : {
        type: Boolean,
        default:false
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

const assignmentModel = db.mongoose.model("assignmentModel", assignmentSchema, "assignment");
module.exports = assignmentModel;
