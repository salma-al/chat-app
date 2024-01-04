//
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { Socket } = require('dgram');
const formatMsg = require('./modules/module');

//
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('new connection');

  socket.emit('message', formatMsg('bot', 'Welcome to chat')); //client that is directly connected to the server

  socket.broadcast.emit(
    'message',
    formatMsg('bot', 'User has joined the chat')
  ); //emit to everyone but the user connecting

  //listen for chat msg
  socket.on('chatMsg', (msg) => {
    console.log(msg);
    io.emit('message', formatMsg('user', msg));
  });

  //disconnect
  socket.on('disconnect', () => {
    io.emit('message', formatMsg('bot', 'User left the chat')); //emit to all users
  });
});

const PORT = process.env.PORT || 7004;

server.listen(PORT, () => {
  console.log(`http://localhost:7004/`);
});
