// imports
const { WebSocketServer } = require('ws');
const log = require('./modules/log');
const DB = require('./modules/db');
const UUID = require('./modules/uuid');

// initialization
const logger = new log();
logger.clear();
const db = new DB();
const wss = new WebSocketServer({ port: 8080 });


// server
wss.on('connection', function connection(ws) {
  logger.add('Client connected.');
  wss.broadcast(JSON.stringify({ message: "User connected", time: new Date().getTime() }));
  db.get().forEach(function (data) {
    ws.send(JSON.stringify({ message: data.message, time: data.time }));
  });
  ws.on('message', function message(_data) {
    if (_data.toString().length < 3) { return; }
    wss.broadcast(JSON.stringify({ message: _data.toString(), time: new Date().getTime() }));
    logger.add(_data.toString());
    db.add(UUID(), _data.toString());
  });
});


// Custom functions for the web socket server
// broadcast message to all clients
wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    client.send(msg);
  });
};