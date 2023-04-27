const getAllTasks = (req, res) => {
    res.send('All items');
};

const getTask = (req, res) => {
    const id = req.params.id;
    res.send(`Get item with id ${id}`);
};

const addTask = (req, res) => {
    res.send('Add item');
};

const updateTask = (req, res) => {
    const id = req.params.id;
    res.send(`Update item with id ${id}`);
};

const removeTask = (req, res) => {
    const id = req.params.id;
    res.send(`Remove item with id ${id}`);
};

module.exports = {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    removeTask
};