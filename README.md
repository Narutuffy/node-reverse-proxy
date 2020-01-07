## About

A simple node proxy server using http/s native modules of nodejs.

## Test

A get request to **foo.planokay.com** should proxy **planokay.com**
A get request to **bar.planokay.com** should proxy **vamsi.hashnode.dev**
A post request to **baz.planokay.com** should proxy the post request to **httpbin.org** and return status code of 200
