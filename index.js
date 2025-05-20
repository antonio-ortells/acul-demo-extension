var express = require('express');
var Webtask = require('webtask-tools');
var request = require('request');

var app = express();
const port = 3000;

app.get('/', function (req, res) {
  console.log('Requested Callback - Angular (4200)')
  let url = `http://localhost:4200/${req.originalUrl.replace('/webtask-localhost-redir', '')}`
  res.redirect(url);
});

app.listen(port, () => {
  console.log(`Localhost Redir listening on port ${port}`)
})

module.exports = Webtask.fromExpress(app);
