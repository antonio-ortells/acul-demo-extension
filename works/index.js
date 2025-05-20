var express = require('express');
var Webtask = require('webtask-tools');

var app = express();
const port = 3000

app.get('/', function (req, res) {
  res.status(200).send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;