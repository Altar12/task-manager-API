const express = require('express');
const { getAllTasks,
        getTask,
        addTask,
        updateTask,
        removeTask } = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks).post(addTask);
router.route('/:id').get(getTask).patch(updateTask).delete(removeTask);

module.exports = router;