const assignmentModel = require('../../models/index').assignmentModel
const studentAssignmentModel = require('../../models/index').studentAssignmentMapModel
const notifQueueModel = require('../../models/index').notifQueueAssignmentModel
const emailServices = require('../../services/index').emailServices
const studentTeacherSubjectModel = require('../../models/index').studentTeacherSubjectMap
let emailMessagesArray = []
let bulkArray = []

module.exports = {

    //to remind teacher one day before about unpublished assignment
    teacherReminder: async (req, res) => {
        try {
            let messageArray = []

            let tomorrow = new Date(new Date().setDate(new Date().getDate() + parseInt(1))).setUTCHours(0, 0, 0, 0)
            tomorrow = new Date(tomorrow)
            tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);

            let queueCheck = await notifQueueModel
                .find({
                    //checking condition for only unpulished assignment
                    startDate: tomorrow,
                    isAssgnmentPublished: false
                })
                .populate([{
                    path: 'teacherId',
                    select: {
                        teacherMail: 1,
                    }
                }, {
                    path: 'assignmentId',
                    select: {
                        assignmentTitle: 1,
                    }
                }
                ])
            if (queueCheck.length > 0) {
                for (let i = 0; i < queueCheck.length; i++) {

                    let emailMessageObj = {
                        to: queueCheck[i].teacherId.teacherMail,
                        from: process.env.ADMIN_EMAIL,
                        subject: 'Assignment Publishing Reminder : ' + queueCheck[i].assignmentId.assignmentTitle + '',
                        text: 'Hey, Please publish your upcoming assignment or else it will automatically published on ' + tomorrow + '',
                        html: '<p>Hey your assignment ' + queueCheck[i].assignmentId.assignmentTitle + ' tomorrow ',
                    }

                    messageArray.push(emailMessageObj)

                    await emailServices.sendEmail(messageArray)
                }

                res.status(200).send({ msg: "reminder sent" })
            } else {
                res.status(200).send({ msg: "nothing to send" })
            }

        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //to see details of assignments by its Id
    autoPublishAssignment: async (req, res) => {
        try {

            let today = new Date(new Date().setDate(new Date().getDate() + parseInt(1))).setUTCHours(0, 0, 0, 0)
            today = new Date(today)

            let queueCheck = await notifQueueModel
                .find({
                    startDate: today,
                    //isNotified: false,
                    isAssgnmentPublished: false
                })
                .populate([{
                    path: 'teacherId',
                    select: {
                        _id: 1,
                        teacherMail: 1,
                    }
                }, {
                    path: 'assignmentId',
                    select: {
                        assignmentTitle: 1,
                        subjectId: 1,
                        attachments: 1
                    }
                }
                ])
            if (queueCheck.length > 0) {
                for (let j = 0; j < queueCheck.length; j++) {

                    let studentList = await studentTeacherSubjectModel
                        .find({
                            teacherId: queueCheck[j].teacherId._id,
                            subjectId: queueCheck[j].assignmentId.subjectId,
                            isActive: true
                        })
                        .populate(
                            {
                                path: 'studentId',
                                select: {
                                    _id: 1,
                                    studentMail: 1,
                                }
                            }
                        )

                    for (let i = 0; i < studentList.length; i++) {

                        let studentAssignmentObj = {
                            assignmentId: queueCheck[j].assignmentId,
                            subjectId: queueCheck[j].assignmentId.subjectId,
                            teacherId: queueCheck[j].teacherId._id,
                            publishedAt: queueCheck[j].startDate,
                            attachments: queueCheck[j].assignmentId.attachments,
                            status: 'PENDING',
                            createdAt: new Date(),
                            isNotified: false,
                            endDate: queueCheck[j].endDate,
                        }

                        let emailMessageObj = {
                            to: studentList[i].studentId.studentMail,
                            from: process.env.ADMIN_EMAIL,
                            subject: 'New Assignment ' + queueCheck[j].assignmentId.assignmentTitle + '',
                            text: 'A new Assignment is published on ' + queueCheck[j].startDate + ' with titile ' + queueCheck[j].assignmentId.assignmentTitle + '',
                            html: '<p>Hey complete this assignment and explore more about <b>' + queueCheck[j].assignmentId.assignmentTitle + '</b></p>',
                        }

                        studentAssignmentObj.studentId = studentList[i].studentId._id

                        //making an message  array for every student
                        emailMessagesArray.push(emailMessageObj)

                        //making an array for insert many 
                        bulkArray.push(studentAssignmentObj)
                    }
                    //mapping student with published assignment
                    await studentAssignmentModel.insertMany(bulkArray)

                    //notifying students about new published assignment
                    await emailServices.sendEmail(emailMessagesArray)

                    //updating assignment publishing status
                    await assignmentModel.updateOne({
                        _id: queueCheck[j].assignmentId
                    },
                        {
                            $set:
                                { isPublished: true }
                        })

                    //udating notification queue
                    await notifQueueModel.updateOne({
                        _id: queueCheck[j]._id
                    },
                        { $set: { isAssgnmentPublished: true } })

                }

                res.status(200).send({ msg: "auto  published" })

            } else {
                res.status(204).send({ msg: "nothing to publish" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    // to remind about end date to onoing assignment
    remindEndDate: async (req, res) => {
        try {

            let tomorrow = new Date(new Date().setDate(new Date().getDate() + parseInt(1))).setUTCHours(0, 0, 0, 0)
            tomorrow = new Date(tomorrow)
            tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);

            let queueCheck = await notifQueueModel
                .find({
                    endDate: tomorrow,
                })
                .populate([{
                    path: 'teacherId',
                    select: {
                        _id: 1,
                        teacherMail: 1,
                    }
                }, {
                    path: 'assignmentId',
                    select: {
                        assignmentTitle: 1,
                        subjectId: 1
                    }
                }
                ])

            if (queueCheck.length > 0) {

                for (let j = 0; j < queueCheck.length; j++) {

                    let studentList = await studentAssignmentModel
                        .find({
                            assignmentId: queueCheck[j].assignmentId._id,
                            teacherId: queueCheck[j].teacherId._id
                        })
                        .populate([
                            {
                                path: 'studentId',
                                select: {
                                    studentMail: 1,
                                }
                            },
                            {
                                path: 'teacherId',
                                select: {
                                    teacherMail: 1,
                                }
                            }
                        ])

                    for (let i = 0; i < studentList.length; i++) {

                        let emailMessageObj = {
                            to: studentList[i].studentId.studentMail,
                            from: process.env.ADMIN_EMAIL,
                            subject: 'End Date For Assignment : ' + queueCheck[j].assignmentId.assignmentTitle + '',
                            text: 'An Assignment is due on ' + queueCheck[j].endDate + ' with titile ' + queueCheck[j].assignmentId.assignmentTitle + '',
                            html: '<p>Hey complete to avoid getting bad marks <b>' + queueCheck[j].assignmentId.assignmentTitle + '</b></p>',
                        }

                        //making an message  array for every student
                        emailMessagesArray.push(emailMessageObj)
                    }

                    //notifying students about new published assignment
                    await emailServices.sendEmail(emailMessagesArray)
                }

                res.status(200).send({ msg: "reminder sent" })

            } else {
                res.status(204).send({ msg: "no content" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },
}