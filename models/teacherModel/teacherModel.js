// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const teacherSchema = new Schema({
  teacherName: {
    type: String,
    required: true,
  },
  teacherMail: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "HUMAN"
  },
  avatar : {
    type: String,
    default: "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663274855653613&alt=media"
  },
  about: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    default: Date.now,
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

const teacherModel = db.mongoose.model("teacherModel", teacherSchema, "teacher");
module.exports = teacherModel;
