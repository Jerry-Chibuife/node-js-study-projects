const Task = require('../models/Task')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const addTask = async (req, res) => {
    try{
        const task = await Task.create(req.body)
        return res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const retrieveTask = (req, res) => {
    res.json({id:req.params.id})
}

const editTask = (req, res) => {
    res.send('update task')
}

const removeTask = (req, res) => {
    res.send('delete task')
}

module.exports = {
    getTasks, addTask, retrieveTask, editTask, removeTask
}