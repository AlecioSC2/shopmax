const server = require('@palecio/nova-server').server;
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
(() => {
  // load env variables. Didn't want to add a library just to do this so we do it manually.
  const lines = fs
    .readFileSync(path.join(__dirname, '.env'))
    .toString()
    .split('\n');
  const envVariables = {};
  lines &&
    lines.forEach(line => {
      const lineArray = line.split('=');
      if (lineArray.length === 2) {
        envVariables[lineArray[0]] = lineArray[1];
      }
    });
  Object.assign(process.env, envVariables);
})();

app.use('/static', express.static(path.join(__dirname, 'static')));

const serverConfig = {
  contextProcessorPaths: __dirname + '/context-processors',
  baseContentModel: {
    product: {}
  }
};

server.start(serverConfig).then(() => {
  app.listen(port, () =>
    console.log(
      `Open the static app in the browser: http://localhost:3000/static/product.html`
    )
  );
});
