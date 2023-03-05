const Course = require('../models/courseModel');

exports.getAllCourses = async (req, res) => {

    const allCourses = await Course.find({});
    if (allCourses) {
        res.status(200).json({
            status: "success",
            message: "Record fetched Successfully!",
            data: allCourses
        })
    }
    else {
        res.status(400).json({
            status: "failure",
            message: "Something wrong!"
        })
    }
}


exports.addCourses = async (req, res) => {
    const { courseName, courseDuration } = req.body;
    const newCourse = {
        name: courseName,
        duration: courseDuration
    }
    const addedCourse = await Course.create(newCourse);
    if (addedCourse) {
        res.status(200).json({
            status: "success",
            message: "Record Created Successfully!",
            data: addedCourse
        })
    }
    else {
        res.status(400).json({
            status: "failure",
            message: "Something wrong!"
        })
    }
}