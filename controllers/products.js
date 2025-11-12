const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req,res) => {
    const result = await mongodb.getDatabase().db().collection('products').find();
    console.log('Getting the products');
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(products);
    });
};

const getSigleProduct = async (req,res) => {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(products[0]);
    });  
};

module.exports = {
    getAllProducts,
    getSigleProduct
}