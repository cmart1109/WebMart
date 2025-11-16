const mongodb = require("../database/database");
const ObjectId = require('mongodb').ObjectId;

const getAllStores = async (req,res) => {
    const result = await mongodb.getDatabase().db().collection('Stores').find();
   console.log('Getting the stores'); 
   result.toArray().then((stores) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(stores)
   })
}

const getSingleStore = async (req,res) => {
     const storeId = new ObjectId(req.params.id);
     const result = await mongodb.getDatabase().db().collection('Stores').find({_id: storeId});
     result.toArray().then((Stores) => {
          res.setHeader('Content-Type', 'application/json')
          res.status(200).json(Stores[0])
     })
}

const createStore = async (req,res) => {
     const store = {
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          opening_hour: req.body.opening_hour,
          closing_hour: req.body.closing_hour,
          type: req.body.type
     }
     const response = await mongodb.getDatabase().db().collection('stores').insertOne(store);
     if (response.aknowledged) {
          res.status(204).send();
     } else {
          res.status(500),json(response.error || `Some error ocurred while creating the store`)
     }
}

const updateStore = async (req,res) => {
     const storeId = new ObjectId(req.params.id);
     const store = {
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          opening_hour: req.body.opening_hour,
          closing_hour: req.body.closing_hour,
          type: req.body.type
     }
     const response = await mongodb.getDatabase().db().collection('Stores').replaceOne({_id: storeId}, store);
     if (response.moifiedCount > 0) {
          res.status(204).send();
     } else {
          res.status(500).json(response.error || 'Some error ocurred while updating the store.')
     }
}

const deleteStore = async (req,res) => {
    const storeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Stores').deleteOne({ _id: storeId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the store')
    }
}


module.exports = {
     getAllStores,
     getSingleStore,
     createStore,
     updateStore,
     deleteStore
}