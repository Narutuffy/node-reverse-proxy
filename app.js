var http = require('http');
var port = 5000;

http.createServer(function (clientReq, clientRes) {
  console.log('serve: ' + clientReq.url);

  var options = {
    hostname: 'planokay.com',
    port: 80,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers
  };

  var proxy = http.request(options, function (res) {
    clientRes.writeHead(res.statusCode, res.headers)
    res.pipe(clientRes, {
      end: true
    });
  });

  clientReq.pipe(proxy, {
    end: true
  });
}).listen(port);
// /////////////////////////////////

