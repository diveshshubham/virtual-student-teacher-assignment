// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const teacherSubjectSchema = new Schema({
  teacherId: {
    type: Schema.ObjectId,
    ref: 'teacherModel',
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'subjectModel',
  },
  isActive: {
    type: Boolean,
    default: true
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

const teacherSubjectModel = db.mongoose.model("teacherSubjectModel", teacherSubjectSchema, "teacherSubjectMap");
module.exports = teacherSubjectModel;
