const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
var bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config.js');
const mysql = require('mysql');
const app = express();
const http = require("http");
const request = require('request');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/'));
console.log(__dirname);
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host     : 'mysql-instance.cxf62rwafx5t.us-west-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'intellatrade',
  database : 'MySqlDB',
  port     : '3306'
});

connection.connect(function(err){
  if(!err) {
      console.log("Connected to database ... ");
  } else {
      console.log("Error connecting database ... ");
  }
});

// connection.query('CREATE TABLE UsersLogin(SNo int,UserName varchar(255),Passord varchar(255));');
// connection.query('INSERT INTO UsersLogin VALUES (1, "Admin", "trade123");');
// connection.query('INSERT INTO UsersLogin VALUES (2, "Pramod", "forex123");');
// connection.query('INSERT INTO UsersLogin VALUES (3, "User", "intellatrade123");');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.get('/recommendations', function(req,res){
  var selectStatement = "SELECT * FROM current_recommendations";
  connection.query( selectStatement, function (err, rows) {
    if (err) {
      console.log('Error in execution of statement'+err.message);
    } else {
        res.json(rows);
      }
    }
  );
});

app.get('/getAllTrades', function(req,res){
    request('http://ec2-54-193-121-31.us-west-1.compute.amazonaws.com:8080/gaincapital-rest-tradingservice/opendealblotter', function (error, response, body) {
      res.jsonp(body);
});
  });

app.get('/getLiveData', function(req,res){
    request('http://ec2-54-193-121-31.us-west-1.compute.amazonaws.com:8080/gaincapital-rest-rateservice/rest/broadcast', function (error, response, body) {
      res.jsonp(body);
});
  });

app.post('/doManualTrade', function(req,res){
    var body = req.body;
    var pair = body.pair;
    var types = body.types;
    var amount = body.amount;
    var rate = body.rate;
    var options = {
  uri: `http://ec2-54-193-121-31.us-west-1.compute.amazonaws.com:8080/gaincapital-rest-tradingservice/dealrequest?userName=Test&product=${pair}&buySell=${types}&amount=${amount}&rate=${rate}`,
  method: 'POST'
};
    request(options, function (error, response, body) {
      res.jsonp(body);
});
  });

app.post('/requestedHistory', function(req, res){
  var body = req.body;
  var symbol = body.forCurr+' '+body.againstCurr;
  var timePeriod = body.timePeriod;
  var query = `SELECT * FROM historical_forex WHERE symbol="${symbol}" and DATEDIFF(DATE(NOW()),datetime) < ${timePeriod}`;
  console.log(query);
  connection.query( query, function (err, rows) {
    if (err) {
      console.log('Error in execution of statement'+err.message);
    } else {
        res.json(rows);
      }
    }
  );
});

app.post('/login', function(req,res){
  var loginRows = "SELECT * FROM UsersLogin";
  connection.query( loginRows, function (err, rows) {
    if (err) {
      console.log('Error in execution of statement'+err.message);
    } else {
        res.json(rows);
      }
    }
  );
});

app.get('/closedDeals', function(req,res){
  var loginRows = "SELECT * FROM closed_deals";
  connection.query( loginRows, function (err, rows) {
    if (err) {
      console.log('Error in execution of statement'+err.message);
    } else {
        res.json(rows);
      }
    }
  );
});

const server = app.listen(8082, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});










































