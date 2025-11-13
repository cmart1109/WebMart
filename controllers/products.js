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

const createProduct = async (req,res) => {
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        stock: req.body.stock,
        refundable: req.body.refundable,
        storeId: req.body.storeId,
        expirationDate: req.body.expirationDate,
        description: req.body.description,
        createdAt: req.body.createdAt
    }
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the product')
    }
}

const updateProduct = async (req,res) => {
    const productId = new ObjectId(req.params.id);
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        stock: req.body.stock,
        refundable: req.body.refundable,
        storeId: req.body.storeId,
        expirationDate: req.body.expirationDate,
        description: req.body.description,
        createdAt: req.body.createdAt
    }
    const response = await mongodb.getDatabase().db().collection('product').replaceONe({_id: productId}, product);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the product.')
    }
}

const deleteProduct = async (req,res) => {
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the product')
    }
}

module.exports = {
    getAllProducts,
    getSigleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}