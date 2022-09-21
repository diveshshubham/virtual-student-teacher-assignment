const subjectModel = require("../../models/index").subjectModel
const teacherSubjectModel = require("../../models/index").teacherSubjectMap
const studentTeacherSubjectModel = require("../../models/index").studentTeacherSubjectMap

module.exports = {

    //add subject by admin
    addSubject: async (req, res) => {
        try {
            const subjectName = req.body.subjectName

            if (subjectName) {

                let commentSave = new subjectModel({
                    subjectName: subjectName,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                })
                commentSave = await commentSave.save()
                res.status(200).send({ data: commentSave })
            } else {
                res.status(400).send({ msg: "wrong body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //map teacher and subject
    mapTeacherSuject: async (req, res) => {
        try {
            const teacherId = req.body.teacherId;
            const subjectId = req.body.subjectId;
            const isActive = req.body.isActive;

            if (teacherId && subjectId) {

                let teacherSubjectObj =
                {
                    teacherId: teacherId,
                    subjectId: subjectId,
                    isActive: true
                }

                let teacherSubjectObjSave = new teacherSubjectModel(teacherSubjectObj)
                teacherSubjectObjSave = await teacherSubjectObjSave.save()

                res.status(200).send({ data: teacherSubjectObjSave })
            } else {
                res.status(400).send({ msg: "invalid params" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //map student and teacher
    mapTeacherStudent: async (req, res) => {
        try {
            const teacherId = req.body.teacherId;
            const subjectId = req.body.subjectId;
            const studentId = req.body.studentId;
            const isActive = req.body.isActive;

            if (teacherId
                && subjectId
                && studentId) {

                let teacherStudentObj =
                {
                    teacherId: teacherId,
                    subjectId: subjectId,
                    studentId: studentId,
                    isActive: true
                }

                let teacherSubjectStudentObjSave = new studentTeacherSubjectModel(teacherStudentObj)
                teacherSubjectStudentObjSave = await teacherSubjectStudentObjSave.save()

                res.status(200).send({ data: teacherSubjectStudentObjSave })
            } else {
                res.status(400).send({ msg: "invalid params" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },
}