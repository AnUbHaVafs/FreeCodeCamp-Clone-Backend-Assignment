const express = require('express');
const router = express.Router();
const { getAllCourses, addCourses } = require('../controllers/courses');

router.get('/course', getAllCourses);
router.post('/course', addCourses);

module.exports = router;