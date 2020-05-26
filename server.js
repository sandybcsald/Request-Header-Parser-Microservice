// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const requestIp = require("request-ip");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//var getIP = require('ipware')().get_ip;
var ipMiddleware = function(req, res, next) {
 const clientIp = requestIp.getClientIp(req); 
 next();
};
//As Connect Middleware
app.use(requestIp.mw())

app.get("/api/whoami", (req,res) => {
  
  var ip = req.clientIp;
  var lang = req.get("Accept-Language");
  var soft = req.get("User-Agent");
  res.json ({
    ipaddress: ip,
 language:lang,
 software:soft
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
