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

function checkHour(checkedHour: number): boolean {
  let timeNow = new Date();
  let hourNow = timeNow.getHours();

  return hourNow >= checkedHour;
}

function closeAtHour(hourToClose: number): void {
  setInterval(() => {
    console.log(
      `Checking hour, result: ${hourToClose} is up ? ${checkHour(hourToClose)}`
    );
    if (checkHour(hourToClose)) {
      spawn('shutdown', ['-h', 'now']); //Close if time is up to this hour
    }
  }, 300000);
}

closeAtHour(21); //close at 21 hour mark

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
