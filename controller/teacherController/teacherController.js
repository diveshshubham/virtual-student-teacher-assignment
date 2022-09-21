var jwt = require('jsonwebtoken');
var jwtsecretTeacher = process.env.JWTSECRETTEACHER;
const teacherModel = require('../../models/index').teacherModel;
var bcrypt = require('bcryptjs');

module.exports = {

    // teacher login controller
    login: async (req, res) => {
        try {
            const teacherMail = req.body.teacherMail;
            const password = req.body.password;
            const teacher = await teacherModel.findOne({ teacherMail: teacherMail });

            //checking if tacher is registered or not
            if(!teacher){
                throw "teacher not registered"
            }

            if (teacher && bcrypt.compareSync(password, teacher.hash)) {

                let responseObj = {}
                responseObj.teacherMail = teacher.teacherMail
                responseObj.teacherName = teacher.teacherName

                createTeacherToken({ id: teacher._id }, function (token) {

                    if (token) {
                        res.status(200).send({ token, responseObj });
                       
                    } else {
                        res.status(500).send({message:"server error"});
                    }
                }, "1d");

            } else {
                res.status(403).send({ msg: "forbidden" });
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: err })
        }
    }
    ,
    //teacher registration
    register: async (req, res) => {
        try {
            const teacherName = req.body.teacherName;
            const teacherMail = req.body.teacherMail;
            const password = req.body.password;
            const about = req.body.about;
            const avatar = req.body.avatar;
            const dob = req.body.dob;
            const gender = req.body.gender;


            let emailCheck = await teacherModel.findOne({ teacherMail: teacherMail })

            //checking existance of email
            if (emailCheck) {
                throw "email already exists"
            }

            if (teacherName && teacherMail && dob && password) {

                let hash = bcrypt.hashSync(password, 10);

                const teacherSaveobj = new teacherModel({
                    teacherName: teacherName,
                    teacherMail: teacherMail,
                    about: about,
                    hash: hash,
                    dob: dob,
                    avatar: avatar,
                    gender: gender,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                });

                const newUser = await teacherSaveobj.save()

                createTeacherToken({ id: newUser._id }, function (token) {

                    if (token) {
                        res.status(200).send({ token, message: "teacher registered" });
                    } else {
                        res.status(500).send("server error");
                    }
                },"1d");
            } else {
                throw "invalid param"
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    // teacher logout
    logout: async (req, res) => {
        try {
            const teacherId = req.teacher.id

            let teacher = await teacherModel.findOne({ _id: teacherId })

            if (!teacher) {
                throw "unauthorized"
            }

            //assign empty string to jwt and kill it in 1 sec
            createTeacherToken({ id: "" }, function (token) {

                if (token) {
                    res.status(200).send({ token });
                } else {
                    res.status(500).send("server error");
                }
            }, "1s");
        }
        catch (err) {
            res.status(500).send("server error")
        }
    }

}

/**
* Used to create JWT token
* @param {Object} teacher
* @param {any} callback
*/
function createTeacherToken(teacher, callback,expiresIn) {
    var token = jwt.sign(teacher, jwtsecretTeacher, {
        expiresIn: expiresIn,
    });
    callback(token);
}
