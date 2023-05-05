const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numFilters } = req.query;
    const queryObject = {};
    if (featured)
        queryObject.featured = featured==='true'? true: false;
    if (company)
        queryObject.company = company;
    if (name)
        queryObject.name = { $regex: name, $options: 'i' };
        if (numFilters) {
        const operatorsMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regex = /\b(>|>=|=|<|<=)\b/g;
        const filters = numFilters.replace(regex, (match) => `-${operatorsMap[match]}-`);
        console.log(filters);
        const fields = ['price', 'rating'];
        filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            const temp = queryObject[field] || {};
            queryObject[field] = { ...temp, [operator]: value };
        });
    }
    if (numFilters) {
        const operatorsMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regex = /\b(>|>=|=|<|<=)\b/g;
        const filters = numFilters.replace(regex, (match) => `-${operatorsMap[match]}-`);
        const fields = ['price', 'rating'];
        filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            const temp = queryObject[field] || {};
            queryObject[field] = { ...temp, [operator]: value };
        });
    }
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else
        result = result.sort('createdAt');
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({ productsCount: products.length, products });
};

module.exports = {
    getAllProducts,
};