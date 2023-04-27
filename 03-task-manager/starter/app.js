const express = require('express');
const tasks = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Task Manger App');
});
app.use('/api/v1/tasks', tasks);

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});