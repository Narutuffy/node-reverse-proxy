var http = require("http");
var https = require("https");
var hostMap = require("./hostMap.json");
var url = require("url");
var port = 8888;
var proxy;

http
  .createServer(function(clientReq, clientRes) {
    console.log("serve: " + clientReq.url);
    var host = clientReq.headers.host;
    delete clientReq.headers.host;
    var options = {
      host: routeToRequiredHost(host),
      port: routePort(host),
      path: clientReq.url,
      method: clientReq.method,
      headers: clientReq.headers
    };

    if (routePort(host) === 443) {
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
  return hostMap[host];
}

function routePort(host) {
  return (url.parse(host).protocol = "https" ? 443 : 80);
}
