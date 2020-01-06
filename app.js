var http = require("http");
var https = require("https");
var port = 8888;
var proxy;

http.createServer(function(clientReq, clientRes) {
  console.log("serve: " + clientReq.url);
  delete clientReq.headers.host;
  var options = {
    host: "planokay.com",
    port: 80,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers
  };
  console.log("clientReq.conn ====>", clientReq.connection.encrypted);
  if (clientReq.connection.encrypted) {
    proxy = https.request(options, function(res) {
      clientRes.writeHead(res.statusCode, res.headers);
      res.pipe(clientRes, {
        end: true
      });
    });
  } else {
    proxy = http.request(options, function(res) {
      clientRes.writeHead(res.statusCode, res.headers);
      res.pipe(clientRes, {
        end: true
      });
    });
  }

  clientReq.pipe(proxy, {
    end: true
  });
})
.listen(port);

// /////////////////////////////////
// Proxy using request module
// var request = require('request');
// http.createServer(function(clientReq, clientRes) {
//   // console.log("======>",clientReq);
//   var url = `https://planokay.com`
//   clientReq.pipe(request({ qs:clientReq.query, uri: url, json: true })).pipe(clientRes);
// }).listen(port);
