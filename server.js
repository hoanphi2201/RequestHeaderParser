// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require("path");

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
app.use(express.static(path.join(__dirname, "public")));
app.get('/api/whoami/', function(req, res) {
   
  var ip = req.headers["x-forwarded-for"];
 var lang = req.headers["accept-language"].slice(0,2);
 
 var os = req.headers["user-agent"].match(/\(([^)]+)\)/)[1];
   res.writeHead(200, {
    "Content-Type": "text/plain"
  });
  res.end(JSON.stringify({"ipaddress": ip, "language": lang, "software": os}));
  });

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
