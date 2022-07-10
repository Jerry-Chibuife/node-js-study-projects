const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom_error')

const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    res.status(200).json({tasks})
})

const addTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    return res.status(201).json({ task })
})

const retrieveTask = asyncWrapper(async (req, res, next) => {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if (!task){
            return next(createCustomError(`No task found with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})

const editTask = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const editDetails = req.body
    const task = await Task.findByIdAndUpdate({_id:taskID}, editDetails, {
        new:true, runValidators:true
    })
    if (!task){
        return next(createCustomError(`No task found with id: ${taskID}`, 404))
    }
    res.status(200).json({task})

})

const removeTask = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if (!task){
        return next(createCustomError(`No task found with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})

module.exports = {
    getTasks, addTask, retrieveTask, editTask, removeTask
}