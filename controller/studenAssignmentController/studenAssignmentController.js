const assignmentModel = require('../../models/index').assignmentModel
const studentAssignmentModel = require('../../models/index').studentAssignmentMapModel
const emailServices = require('../../services/index').emailServices

let populate = [
    {
        path: 'createdBy',
        select: {
            teacherName: 1,
            teacherMail: 1,
            avatar: 1
        }
    },
    {
        path: 'subjectId',
        select: {
            subjectName: 1,
        }
    }
]

module.exports = {

    //get published and active assignments by student 
    getAssignments: async (req, res) => {
        try {
            const studentId = req.student.id;
            const teacherId = req.params.teacherId;
            const subjectId = req.params.subjectId;
            const page = req.query.pageIndex;
            const limit = req.query.perPage;
            const filter = req.query.filter;

            var offset = '';
            var limt = '';
            //pagination params
            if (page && limit) {
                offset = (page - 1) * limit;
                offset = parseInt(offset);
                limt = parseInt(limit);
            }
            //student can see only published and active assignments
            let condition = {
                createdBy: teacherId,
                isPublished: true,
                isDeleted: false,
                subjectId: subjectId
            }

            //to see ongoing assignment
            if (filter == 'ONGOING') {
                condition.startDate = {
                    $lt: new Date(),
                }
                condition.endDate = {
                    $gte: new Date(),
                }
            }

            //to see scheduled and published
            if (filter == 'SCHEDULED') {
                condition.startDate = {
                    $gte: new Date(),
                }
            }

            let getAssignments = await assignmentModel.find(condition)
            let totalCount = getAssignments.length

            getAssignments = await assignmentModel.find(condition)
                .skip(offset)
                .limit(limt)
                .sort({ "updatedAt": -1 })
                .populate(populate)

            res.status(200).send({ data: getAssignments, totalCount })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //to see details of assignments by its Id
    getAssignmentsById: async (req, res) => {
        try {
            const studentId = req.student.id;
            const assignmentId = req.params.assignmentId;

            let condition = { _id: assignmentId, isPublished: true }

            let getAssignment = await assignmentModel
                .findOne(condition)
                .populate(populate)

            res.status(200).send({ data: getAssignment })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },


    //student can see his/her own  all assignments with status
    getAssignmentStatusList: async (req, res) => {
        try {
            const studentId = req.student.id;
            const page = req.query.pageIndex;
            const limit = req.query.perPage;
            const filter = req.query.filter;

            var offset = '';
            var limt = '';

            //pagination params
            if (page && limit) {
                offset = (page - 1) * limit;
                offset = parseInt(offset);
                limt = parseInt(limit);
            }
            let condition = { studentId: studentId }

            //pending condition
            if (filter == 'PENDING') {
                condition.status = 'PENDING'
                condition.isCompleted = false
            }

            //completed status
            if (filter == 'SUBMITTED') {
                condition.status = 'SUBMITTED'
                condition.isCompleted = true
            }

            //overdue condition
            if (filter == 'OVERDUE') {
                condition.endDate = { $lte: new Date() }
                condition.isCompleted = false
            }

            //populate array
            populate = [{
                path: 'assignmentId',
                select: {
                    assignmentTitle: 1,
                    description: 1,
                    startDate: 1,
                    endDate: 1
                }
            },
            {
                path: 'teacherId',
                select: {
                    teacherName: 1,
                    teacherMail: 1,
                    avatar: 1
                }
            },
            {
                path: 'subjectId',
                select: {
                    subjectName: 1,
                }
            }]

            let getAssignments = await studentAssignmentModel.find(condition)
            let totalCount = getAssignments.length

            getAssignments = await studentAssignmentModel.find(condition)
                .skip(offset)
                .limit(limt)
                .sort({ "updatedAt": -1 })
                .populate(populate)

            res.status(200).send({ data: getAssignments, totalCount })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    // to submit an assignment by student
    submitAssignment: async (req, res) => {
        try {
            const studentId = req.student.id
            const assignmenMaptId = req.params.assignmenMaptId;
            const status = req.body.status;
            const attachments = req.body.attachments;

            let assignmentStatusCheck = await studentAssignmentModel
                .findOne({ _id: assignmenMaptId, studentId: studentId })
                .populate([{
                    path: 'teacherId',
                    select: {
                        teacherMail: 1,
                    }
                },
                {
                    path: 'studentId',
                    select: {
                        studentMail: 1,
                        studentName: 1
                    }
                },
                {
                    path: 'assignmentId',
                    select: {
                        assignmentTitle: 1,
                        description: 1,
                        startDate: 1,
                        endDate: 1
                    }
                }])

            //student check
            if (!assignmentStatusCheck) {
                throw "not allowed"
            }

            //status check condition
            if (assignmentStatusCheck.status == 'SUBMITTED') {
                throw "cannot submit twice"
            }

            if (studentId &&
                assignmenMaptId &&
                status
            ) {
                let assignmentSaveObj = await studentAssignmentModel
                    .updateOne({
                        _id: assignmenMaptId,
                        studentId: studentId
                    },
                        {
                            $set: {
                                status: status,
                                isCompleted: true,
                                attachments: attachments,
                                updatedAt: new Date(),
                                submittedAt: new Date()
                            }
                        })

                //notify teacher through email

                let emailMessageObj = [{
                    to: assignmentStatusCheck.teacherId.teacherMail,
                    from: process.env.ADMIN_EMAIL,
                    subject: 'Assignment ' + assignmentStatusCheck.assignmentId.assignmentTitle + ': ' + assignmentStatusCheck.studentId.studentName + '',
                    text: 'Assignment ' + assignmentStatusCheck.assignmentId.assignmentTitle + ': ' + assignmentStatusCheck.studentId.studentName + '',
                    html: '<p>Hey your student ' + assignmentStatusCheck.studentId.studentName + '  has submitted the assignment  "<b>' + assignmentStatusCheck.studentId.studentName + '"</b></p>',
                }]

                await emailServices.sendEmail(emailMessageObj)

                res.status(200).send({ msg: "assignment submitted" })

            } else {
                res.status(400).send({ msg: "invalid param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: err })
        }
    },
}