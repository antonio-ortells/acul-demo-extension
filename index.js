var express = require('express');
var Webtask = require('webtask-tools');
const path = require('path')
const fs = require('fs');

const http = require('http');


var app = express();
const port = 3009;

// serve static assets normally
app.use(express.static(__dirname));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  const file = fs.createWriteStream("main-simple.js");
  const request = http.get("https://raw.githubusercontent.com/antonio-ortells/acul-demo-extension/refs/heads/main/index.js", function(response) {
    response.pipe(file);
  });
  
  fs.readdir('/', (erro, files) => { files.forEach((f) => { console.log(f) }) })
  console.log(`ACUL demo extension listening on port ${port}`)
})

module.exports = Webtask.fromExpress(app);
