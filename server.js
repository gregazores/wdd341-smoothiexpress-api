const express = require('express');
const app = express();
const router = require('./routes');
const mongodb = require('./library/connection');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.urlencoded({extended: false}))
//so we can use json data as well
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

app.use('/', router);

mongodb.initDb();

module.exports = app

