var http = require("http");
var https = require("https");
var port = 8888;
var proxy;

http.createServer(function(clientReq, clientRes) {
  console.log("serve: " + clientReq.url);
  var host = clientReq.headers.host;
  delete clientReq.headers.host;
  var options = {
    host: routeToRequiredHost(host),
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

function routeToRequiredHost(host) {
  console.log(host);
  if(host === "foo.planokay.com") {
    return "planokay.com"
  } else if(host === "bar.planokay.com") {
    return "vamsi.hashnode.dev"
  } else if(host === "baz.planokay.com") {
    return "httpbin.org"
  }
}

// /////////////////////////////////
// Proxy using request module
// var request = require('request');
// http.createServer(function(clientReq, clientRes) {
//   // console.log("======>",clientReq);
//   var url = `https://planokay.com`
//   clientReq.pipe(request({ qs:clientReq.query, uri: url, json: true })).pipe(clientRes);
// }).listen(port);
