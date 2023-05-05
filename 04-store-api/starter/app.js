require('dotenv').config();
require('express-async-errors');
const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h3>STORE API</h3><a href="./api/v1/products">Get Products</a>');
});
app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();