module.exports = {
    "validateApiKey": require('./apiKey/apiKey'),
    "validateStudentToken": require('./token/studentToken'),
    "validateTeacherToken": require('./token/teacherToken'),
};