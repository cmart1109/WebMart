const express  = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongodb = require('./database/database')

app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next();
});

app.use('/', require('./routes/index'));
app.use('/products', require('./routes/products'))


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is running on port ${port}`);
        })
    }
})
