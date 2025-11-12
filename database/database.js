const dotenv = require("dotenv");
dotenv.config();


const MongoClient = require('mongodb').MongoClient;
let database;
const initDb = (callback) => {
    if (database) {
        console.log('db is succesfully initialized!');
        return callback(null, _db)
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            callback(null,database);
        })
        .catch((err) => {
            callback(err)
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error("Database not initialized")
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
}