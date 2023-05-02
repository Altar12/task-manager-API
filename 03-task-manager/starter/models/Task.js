const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'task name is required'],
        trim: true,
        maxlength: [30, 'task name can have atmost 30 chars']
    },
    completed: {
        type: String,
        default: false,
    },
});

module.exports = mongoose.model('Task', taskSchema);