require('dotenv').config();
const products = require('./products.json');
const connectDB = require('./db/connect');
const Product = require('./models/product');

const populateDB = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(products);
        console.log('Success...');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

populateDB();