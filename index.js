const { WebSocketServer } =  require('ws');
const log = require('./modules/log');
const DB = require('./modules/db');
const UUID = require('./modules/uuid');
const logger = new log();
logger.clear();
const db = new DB();
const wss = new WebSocketServer({ port: 8080 });



wss.on('connection', function connection(ws) {
  logger.add('Client connected.');
  wss.broadcast("User connected.");
  db.get().forEach(function (data) {
    ws.send(data.message);
  });
  ws.on('message', function message(_data) {
    wss.broadcast(_data.toString());
    logger.add(_data.toString());
    db.add(UUID(), _data.toString());
  });
});



wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
      client.send(msg);
   });
};