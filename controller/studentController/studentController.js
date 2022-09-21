var jwt = require('jsonwebtoken');
var jwtsecretStudent = process.env.JWTSECRETSTUDENT
var bcrypt = require('bcryptjs');
const studentModel = require('../../models/index').studentModel;

module.exports = {

    // student login controller
    login: async (req, res) => {
        try {
            const studentMail = req.body.studentMail;
            const password = req.body.password;
            const student = await studentModel.findOne({ studentMail: studentMail });

            //checking existing userMail
            if (!student) {
                throw "student not registered"
            }

            if (student && bcrypt.compareSync(password, student.hash)) {

                let responseObj = {}
                responseObj.studentMail = student.studentMail
                responseObj.studentName = student.studentName

                createStudentToken({ id: student._id }, function (token) {

                    if (token) {
                        res.status(200).send({ token, responseObj });
                    } else {
                        res.status(500).send({ msg: "error in token" });
                    }
                }, "1d" //1 day token expiration
                );

            } else {
                res.status(403).send({ msg: "forbidden" });
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: err })
        }
    },
    //student registration
    register: async (req, res) => {
        try {
            const studentName = req.body.studentName;
            const studentMail = req.body.studentMail;
            const password = req.body.password;
            const about = req.body.about;
            const avatar = req.body.avatar;
            const dob = req.body.dob;
            const gender = req.body.gender;


            let emailCheck = await studentModel.findOne({ studentMail: studentMail })

            //avoid duplicate emails
            if (emailCheck) {
                throw "email already exists"
            }

            if (studentName && studentMail && dob && password) {

                let hash = bcrypt.hashSync(password, 10);

                const studentSaveobj = new studentModel({
                    studentName: studentName,
                    studentMail: studentMail,
                    about: about,
                    hash: hash,
                    dob: dob,
                    avatar: avatar,
                    gender: gender,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                });

                const newUser = await studentSaveobj.save()

                createStudentToken({ id: newUser._id }, function (token) {

                    if (token) {
                        res.status(200).send({ token, message: "student registered" });
                    } else {
                        throw "token error"
                    }
                }, 
                "1d"); //token expires in 1 day
            } else {
                throw "invalid param"
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ msg: err })
        }
    },

    // student logout
    logout: async (req, res) => {
        try {
            const studentId = req.student.id

            //assign empty string to jwt 
            createStudentToken({ id: "" }, function (token) {

                if (token) {
                    res.status(200).send({ token });
                } else {
                    throw "token error"
                }
            }, "1s");
        }
        catch (err) {
            res.status(500).send({ msg: err })
        }
    }
}

/**
* Used t o create JWT token
* @param {Object} student
* @param {any} callback
*/
function createStudentToken(student, callback, expiresIn) {
    var token = jwt.sign(student, jwtsecretStudent, {
        expiresIn: expiresIn
    });
    callback(token);
}
