var express = require('express');
var Webtask = require('webtask-tools');

const https = require('https');

const GITHUB_RAW = 'https://raw.githubusercontent.com/antonio-ortells/acul-demo-extension/refs/heads/main';

async function getFileContentFromUrl(url) {
  return new Promise((resolve, reject) => {
      https.get(url, (res) => {
          let data = '';

          // A chunk of data has been received.
          res.on('data', (chunk) => {
              data += chunk; // For text files
              // For binary files, you might want to use Buffer.concat later
              // let bufferChunks = [];
              // bufferChunks.push(chunk);
          });

          // The whole response has been received.
          res.on('end', () => {
              // If it's a text file, 'data' string is fine.
              // If it's a binary file, you might need to convert it to a Buffer:
              // const fullBuffer = Buffer.concat(bufferChunks);
              // resolve(fullBuffer);
              resolve(data);
          });

          res.on('error', (err) => {
              reject(new Error(`Error fetching file: ${err.message}`));
          });
      }).on('error', (err) => {
          reject(new Error(`Request failed: ${err.message}`));
      });
  });
}

var app = express();
const port = 3009;

app.get('*', async function (request, response) {
  request.url
  console.log('Serve:', request.url);
  let f = await getFileContentFromUrl(`${GITHUB_RAW}${request.url}`);
  if (f) {
    response.send(f);
  } else {
    response.status(404);
    response.send();
  }
});

app.listen(port, async () => {
  console.log(`ACUL demo extension listening on port ${port}`)
})

module.exports = Webtask.fromExpress(app);
