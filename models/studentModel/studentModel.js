// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const studentSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentMail: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "HUMAN"
  },
  about: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-21-48.png?generation=1663275129005470&alt=media"
  },
  dob: {
    type: Date,
    default: Date.now,
  },
  hash: {
    type: String,
    required: true
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

const studentModel = db.mongoose.model("studentModel", studentSchema, "student");
module.exports = studentModel;
