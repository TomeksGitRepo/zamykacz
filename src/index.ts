// lib/app.ts
import express = require('express');
import { spawn } from 'child_process';

// Create a new express application instance
const app: express.Application = express();

app.get('/', function(req, res) {
  res.sendFile('public/index.html', { root: __dirname }, err =>
    console.log(err)
  );
});

app.get('/close', function(req, res) {
  res.send('Serwer is closing');
  spawn('shutdown', ['-h', 'now']);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
