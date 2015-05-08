
var express = require('express');
var app = express();

var eztv = require('eztvapi')();
var page = 1;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/shows/:page', function(req, res, next) {
  var page = req.params.page;
  eztv.getShows(page, function (err, shows) {
    if (err) { return console.log('No such page or something went wrong'); }
    res.json(shows)
    console.log(shows);
  });
});

app.get('/show/:showId', function(req,res,next) {
  var showId = req.params.showId;
  eztv.getShow(showId, function (err, show) {
    if (err) { return console.log('No such show or something'); }
    
    res.json(show);
  });
});


var server = app.listen(4000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('media-service-shows listening at http://%s:%s', host, port);

});
