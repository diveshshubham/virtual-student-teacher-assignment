// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const subjectSchema = new Schema({
  subjectName:{
    type:String,
    required:true
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

const subjectModel = db.mongoose.model("subjectModel", subjectSchema, "subject");
module.exports = subjectModel;
