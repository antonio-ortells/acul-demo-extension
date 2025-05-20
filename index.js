var express = require('express');
var Webtask = require('webtask-tools');
const path = require('path')
const fs = require('fs');

var app = express();
const port = 3009;

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  fs.readdir('/', (erro, files)=>{files.forEach((f)=>{console.log(file)})})
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`ACUL demo extension listening on port ${port}`)
})

module.exports = Webtask.fromExpress(app);
