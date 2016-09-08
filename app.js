var express = require('express'),
  fs = require('fs'),
  OpenTok = require('opentok'),
  https = require('https'),
  app = express(),
  config;


  try {

 config = '{ "port":"3000","apiKey":"45644902","apiSecret":"db8fbb0775b923c89422b7a09dceeac4570d2efe","chromeExtensionId":"gloebbmiakfjnkcohlmbciijakonfehm"}';

 var configJson=JSON.parse(config);
console.log(configJson.port)

 }

  catch (err) {
    console.log('Error reading config.json - have you copied config.json.sample to config.json? ',err);
    process.exit();
  }

  var redis = require('redis').createClient();



app.use(express.logger());

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

var ot = new OpenTok(configJson.apiKey, configJson.apiSecret);

//var useSSL = fs.existsSync(__dirname + '/server.key') && fs.existsSync(__dirname + '/server.crt');
var useSSL = fs.existsSync(__dirname + '/28071246-55.55.55.128.key') && fs.existsSync(__dirname + '/28071246-55.55.55.128.cert');

require('./server/routes.js')(app, configJson, redis, ot, useSSL);

 https.createServer({
    key: fs.readFileSync('./28071246-55.55.55.128.key'),
    cert: fs.readFileSync('./28071246-55.55.55.128.cert')
  }, app).listen(configJson.port, function() {
    console.log('Listening on ' + configJson.port);
  });