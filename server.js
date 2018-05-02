//Express.js Server

var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var productRoutes = require('./expressRoutes/productRoutes');

const app = express();
app.use(bodyparser.json({limit:'5mb'}));
app.use(cors());

app.use(express.static('src'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port '+port);
})

//*********DATABASE CONNECTION****************

// Connection URL
var url = 'mongodb://Devansh:devansh08@ds121589.mlab.com:21589/latestwork';

mongoose.Promise = global.Promise;

mongoose.connect(url);

var db = mongoose.connection;


db.once('open', function(){
  console.log("DB Connected!");
})

//************************************************

app.use('/Product',productRoutes);
