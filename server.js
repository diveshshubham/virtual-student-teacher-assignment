const cors = require("cors");
const express = require("express");
const compression=require('compression');
const viewEngine  = require('./config/viewEngine');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(compression())


var corsOptions = {
  origin: "http://localhost:8086"
};
app.use(cors(corsOptions));
viewEngine(app);
const student = require('./router/index').studentRoutes;
const teacher = require('./router/index').teacherRoutes;
const studentAssignment = require('./router/index').studentAssignmentRoutes;
const teacherAssignMent = require('./router/index').teacherAssignmentRoutes;
const welcome = require('./router/index').welcome;
const upload = require('./router/index').uploadFilesRoutes;
const admin = require('./router/adminRoutes/adminRoutes');
const notificationsAuto = require('./router/index').notificationAuto;

app.use(express.urlencoded({ extended: true }));

student(app)
teacher(app)
studentAssignment(app)
teacherAssignMent(app)
welcome(app)
upload(app)
admin(app)
notificationsAuto(app)

function initializeDatabaseConnection(){
  require('./database/mongo/connection')
}

initializeDatabaseConnection()

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});