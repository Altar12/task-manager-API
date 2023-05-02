const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });
    if (!task)
        return res.status(404).json({ msg: `no task with id ${taskID}` });
    res.status(200).json({ task });
});

const addTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task)
        return res.status(404).json({ msg: `no task with id ${taskID}` });
    res.status(200).json({ task });
});

const removeTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task)
        return res.status(404).json({ msg: `no task with id ${taskID}` });
    res.status(200).json({ task });
});

module.exports = {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    removeTask
};