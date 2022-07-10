const express = require('express')
const router = express.Router()

const {getTasks, addTask, retrieveTask, editTask, removeTask} = require('../services/taskService')

router.route('/').get(getTasks).post(addTask)
router.route('/:id').get(retrieveTask).patch(editTask).delete(removeTask)

module.exports = router