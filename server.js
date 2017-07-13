const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const path = require('path');
const cpu = require('windows-cpu');
const os = require('os');
const utils = require('os-utils');

const port = process.env.PORT || 3100;
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  setInterval(() => {
    let percents = 0;
    if (os.type() === 'Windows_NT') {
      cpu.totalLoad(function (error, results) {
        if (error) {
          return console.log(error);
        }
        results.map((value) => percents += value);
        ws.send(percents);
      });
    }
    if(os.type() == 'Darwin'){
      utils.cpuUsage((v)=>{
        ws.send(v*100);
      })
    }
  }, 1000)


});

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/dist/index.html'))
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})


