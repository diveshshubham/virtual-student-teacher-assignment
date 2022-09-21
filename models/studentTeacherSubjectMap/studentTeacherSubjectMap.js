// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const teacherSubjectSubjectSchema = new Schema({
  teacherId: {
    type: Schema.ObjectId,
    ref: 'teacherModel',
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'subjectModel',
  },
  studentId: {
    type: Schema.ObjectId,
    ref: 'studentModel',
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

const studentTeacherSubjectModel = db.mongoose.model("studentTeacherSubjectModel", teacherSubjectSubjectSchema, "teacherSubjectStudentMap");
module.exports = studentTeacherSubjectModel;
