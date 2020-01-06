var http = require('http');
var port = 8888;

http.createServer(function (clientReq, clientRes) {
  console.log('serve: ' + clientReq.url);

  var options = {
    hostname: '104.22.9.217',
    port: 80,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers
  };

  var proxy = http.request(options, function (res) {
    clientRes.writeHead(res.statusCode, res.headers);
    // console.log(clientRes);
    res.pipe(clientRes, {
      end: true
    });
  });

  clientReq.pipe(proxy, {
    end: true
  });
}).listen(port);

// /////////////////////////////////
// Proxy using request module
// var request = require('request');
// http.createServer(function(clientReq, clientRes) {
//   // console.log("======>",clientReq);
//   var url = `https://planokay.com`
//   clientReq.pipe(request({ qs:clientReq.query, uri: url, json: true })).pipe(clientRes);
// }).listen(port);
