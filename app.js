const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended : true
}));

app.usee(express.static('public'));

app.listen(3000, () => {
    console.log("Server started on port 3000");
})
