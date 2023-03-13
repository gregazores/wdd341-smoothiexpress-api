const express = require('express');
const app = express();
const router = require('./routes');
const mongodb = require('./library/connection');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use('/images', express.static('images'))

app.use(express.urlencoded({extended: false}))
//so we can use json data as well
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

app.use('/', router);

mongodb.initDb();

module.exports = app

