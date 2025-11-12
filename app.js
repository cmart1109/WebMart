const express  = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongodb = require('./database/database')

app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.send('Hello World');
})


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is running on port ${port}`);
        })
    }
})
