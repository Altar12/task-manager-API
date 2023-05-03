const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async');
const CustomAPIError = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });
    if (!task)
        return next(new CustomAPIError(404, `no task with id ${taskID}`));
    res.status(200).json({ task });
});

const addTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task)
        return next(new CustomAPIError(404, `no task with id ${taskID}`));
    res.status(200).json({ task });
});

const removeTask = asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task)
        return next(new CustomAPIError(404, `no task with id ${taskID}`));
    res.status(200).json({ task });
});

module.exports = {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    removeTask
};