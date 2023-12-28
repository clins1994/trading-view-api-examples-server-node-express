const express = require('express');
const http = require('http');
const WebSocketServer = require('./src/websocket');

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocketServer(server);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
