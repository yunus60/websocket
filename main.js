const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('play', () => {
    
    console.log('play');
    socket.broadcast.emit("play");
  });

  socket.on('pause', () => {
    console.log('pause');
    socket.broadcast.emit("pause");
  });

  socket.on('seeked', (seek) => {
    
    console.log('seeked', seek);
    socket.broadcast.emit("seeked", seek);
    
    
  });

  socket.on('videoEvent', (event, currentTime) => {
    // log('Got video event:', room, event, 'from: ', socket.id, volume, currentTime);
    socket.broadcast.emit('videoEvent', event, currentTime);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
