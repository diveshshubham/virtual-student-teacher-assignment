const mongoose = require("mongoose");
const { Types } = require("mongoose");
const assignmentModel = require('../../models/index').assignmentModel
const studentAssignmentModel = require('../../models/index').studentAssignmentMapModel
const studentTeacherSubjectModel = require('../../models/index').studentTeacherSubjectMap
const teacherSubjectMapModel = require('../../models/index').teacherSubjectMap
const notifQueueModel = require('../../models/index').notifQueueAssignmentModel
const emailServices = require('../../services/index').emailServices

module.exports = {

    //teacher creates assignment 
    createAssignment: async (req, res) => {
        try {
            const createdBy = req.teacher.id
            const subjectId = req.body.subjectId;
            const description = req.body.description;
            const isPublished = req.body.isPublished;
            let startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const attachments = req.body.attachments;
            const assignmentTitle = req.body.assignmentTitle;
            let isAssgnmentPublished = false

            let flag = 0
            let bulkArray = []
            let emailMessagesArray = []

            let teacherSubjectCheck = await teacherSubjectMapModel.findOne({
                teacherId: mongoose.Types.ObjectId(createdBy),
                subjectId: subjectId
            })

            //checking if teacher is a valid subject teacher
            if (!teacherSubjectCheck) {
                throw "you have expertise in different subject"
            }

            //checking proper date condition
            if (endDate > new Date() ||
                startDate > endDate) {
                throw "invalid date"
            }

            if (subjectId &&
                description &&
                startDate &&
                endDate &&
                assignmentTitle
            ) {

                //if assignment is published then changing start date to today
                if (isPublished == true) {
                    startDate = new Date()
                    flag = 1
                }

                let assignMentObj = new assignmentModel({
                    createdBy: createdBy,
                    subjectId: subjectId,
                    description: description,
                    isPublished: isPublished,
                    startDate: startDate,
                    endDate: endDate,
                    assignmentTitle: assignmentTitle,
                    attachments: attachments
                })

                const newAssignment = await assignMentObj.save()

                //notifying and mapping takes place only when assignment is published
                if (flag == 1) {

                    let studentList = await studentTeacherSubjectModel
                        .find({
                            teacherId: createdBy,
                            subjectId: subjectId,
                            isActive: true
                        })
                        .populate(
                            {
                                path: 'studentId',
                                select: {
                                    studentMail: 1,
                                }
                            }
                        )

                    for (let i = 0; i < studentList.length; i++) {

                        let studentAssignmentObj = {
                            assignmentId: newAssignment._id,
                            subjectId: subjectId,
                            teacherId: createdBy,
                            publishedAt: startDate,
                            status: 'PENDING',
                            createdAt: new Date(),
                            isNotified: false,
                            endDate: endDate,
                        }

                        let emailMessageObj = {
                            to: studentList[i].studentId.studentMail,
                            from: process.env.ADMIN_EMAIL,
                            subject: 'New Assignment ' + assignmentTitle + '',
                            text: 'A new Assignment is published on ' + startDate + ' with titile ' + assignmentTitle + '',
                            html: '<p>Hey complete this assignment and explore more about <b>' + assignmentTitle + '</b></p>',
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

                    isAssgnmentPublished = true
                } else {
                    const notifQueueObject = new notifQueueModel({
                        assignmentId: newAssignment._id,
                        isAssgnmentPublished: isAssgnmentPublished,
                        isNotified: false,
                        teacherId: createdBy,
                        startDate: startDate,
                        endDate: endDate,
                    })

                    await notifQueueObject.save()
                }

                res.status(200).send({ msg: "assignmet created", newAssignment: newAssignment })
            } else {
                res.status(400).send({ msg: "wrong body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: err })
        }
    },

    //teacher  edits or delete assinment
    updateAssignment: async (req, res) => {
        try {
            const createdBy = req.teacher.id
            const assignmentId = req.params.assignmentId;
            const description = req.body.description;
            const subjectId = req.body.subjectId
            const endDate = req.body.endDate;
            const startDate = req.body.startDate;
            const isPublished = req.body.isPublished;
            const isDeleted = req.body.isDeleted;
            const assignmentTitle = req.body.assignmentTitle
            let emailMessagesArray = []
            let bulkArray = []

            let assignmentCheck = await assignmentModel.findOne({
                _id: assignmentId
            })

            if (startDate > endDate) {
                throw "invalid date"
            }

            if (startDate < new Date() && assignmentCheck.isPublished) {
                throw "invalid  param "
            }

            if (description &&
                endDate &&
                subjectId &&
                startDate) {

                let assignMentUpdObj = {
                    description: description,
                    endDate: endDate,
                    isPublished: isPublished,
                    assignmentTitle: assignmentTitle,
                    subjectId: subjectId,
                    startDate: startDate,
                    updatedAt: new Date()
                }

                //Deleting assignment
                if (isDeleted == true) {
                    assignMentUpdObj.isDeleted = true
                }

                await assignmentModel.updateOne({ _id: assignmentId },
                    { $set: assignMentUpdObj })

                if (assignmentCheck.isPublished == false && isPublished) {

                    let studentList = await studentTeacherSubjectModel
                        .find({
                            teacherId: createdBy,
                            subjectId: subjectId,
                            isActive: true
                        })
                        .populate(
                            {
                                path: 'studentId',
                                select: {
                                    studentMail: 1,
                                }
                            }
                        )

                    for (let i = 0; i < studentList.length; i++) {

                        let studentAssignmentObj = {
                            assignmentId: assignmentId,
                            subjectId: subjectId,
                            teacherId: createdBy,
                            publishedAt: startDate,
                            status: 'PENDING',
                            createdAt: new Date(),
                            endDate: endDate,
                        }

                        let emailMessageObj = {
                            to: studentList[i].studentId.studentMail,
                            from: process.env.ADMIN_EMAIL,
                            subject: 'New Assignment ' + assignmentTitle + '',
                            text: 'A new Assignment is published on ' + startDate + ' with titile ' + assignmentTitle + '',
                            html: '<p>Hey complete this assignment and explore more about <b>' + assignmentTitle + '</b></p>',
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
                }

                //notifying and updating student assignment map if it's a published assignment
                if (assignmentCheck.isPublished) {
                    let studentList = await studentAssignmentModel.find({
                        assignmentId: assignmentId,
                        teacherId: createdBy
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
                    //updating user's end date and notifying them when teacher updates assignment
                    let updateStudentAssignment = await studentAssignmentModel.updateMany(
                        {
                            assignmentId: assignmentId,
                            teacherId: createdBy
                        },
                        {
                            $set: {
                                endDate: endDate,
                                updatedAt: new Date()

                            }
                        }
                    )
                    console.log(studentList)
                    for (let i = 0; i < studentList.length; i++) {
                        console.log(studentList[i].studentId.studentMail)

                        let emailMessageObj = {
                            to: studentList[i].studentId.studentMail,
                            from: process.env.ADMIN_EMAIL,
                            subject: 'Update In  ' + assignmentTitle + '',
                            text: 'An update in  Assignment : titile ' + assignmentTitle + '',
                            html: '<p>Hey there  is some change in the assignment  <b>' + assignmentTitle + '</b></p>',
                        }

                        //making message array to notify students
                        emailMessagesArray.push(emailMessageObj)
                    }
                    //sending email to students
                    console.log(emailMessagesArray)
                    await emailServices.sendEmail(emailMessagesArray)
                }
                await notifQueueModel.updateOne({
                    assignmentId: assignmentId,
                }, {
                    $set: {
                        startDate: startDate,
                        endDate: endDate
                    }
                })
                res.status(200).send({ msg: "assignmet updated" })
            } else {
                res.status(400).send({ msg: "wrong body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: err })
        }
    },


    //teahcer gets all assignments
    getAssignMents: async (req, res) => {
        try {
            const teacherId = req.teacher._id;
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
            //condition for not deleted assignment
            let condition = {
                createdBy: teacherId,
                isDeleted: false
            }

            //ongoing filter
            if (filter == 'ONGOING') {
                condition.startDate = {
                    $lt: new Date(),
                }
                condition.endDate = {
                    $gte: new Date(),
                }
            }

            //scheduled filter
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
                .populate(
                    {
                        path: 'subjectId',
                        select: {
                            subjectName: 1,
                        }
                    })

            res.status(200).send({ data: getAssignments, totalCount })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //teacher can see student's status list
    getStudentStatusList: async (req, res) => {
        try {
            const teacherId = req.teacher.id;
            const assignmentId = req.params.assignmentId;
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
            let condition = { assignmentId: assignmentId, teacherId: teacherId }

            //pending condition
            if (filter == 'PENDING') {
                condition.status = 'PENDING'
            }

            //submitted condition
            if (filter == 'SUBMITTED') {
                condition.status = 'SUBMITTED'
            }

            //overdue condition
            if (filter == 'OVERDUE') {
                condition.isCopleted = false
                condition.endDate = { $lte: new Date() }
            }

            let populate = [{
                path: 'assignmentId',
                select: {
                    description: 1,
                    startDate: 1,
                    endDate: 1
                }
            },
            {
                path: 'studentId',
                select: {
                    studentName: 1,
                    studeneMail: 1,
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

    //get assignment by its id
    getAssignmentsById: async (req, res) => {
        try {
            const teacherId = req.teacher.id;
            const assignmentId = req.params.assignmentId;

            let condition = { _id: assignmentId }

            let getAssignment = await assignmentModel
                .findOne(condition)
                .populate(
                    {
                        path: 'subjectId',
                        select: {
                            subjectName: 1,
                        }
                    })

            res.status(200).send({ data: getAssignment })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },
}