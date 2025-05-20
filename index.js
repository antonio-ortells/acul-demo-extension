var express = require('express');
var Webtask = require('webtask-tools');

var app = express();
const port = 3000;

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`ACUL demo extension listening on port ${port}`)
})

module.exports = Webtask.fromExpress(app);
