const path = require('path');
const express = require('express');
const app = express();
const http = require('http')
const expressServer = http.createServer(app);

//Socket Server integrates with Nodejs HTTP Server
const { Server } = require('socket.io')
const io = new Server(expressServer);


//default namespace //for all user
// connection/disconnect
io.on('connection', function(socket){
  // console.log(socket);
  console.log("New user connected", socket.id);

  //send message(server to client)
  setTimeout(() => {
    //1. message event
    // socket.send("This is a message from server to client.")

    //2. custom event
    // socket.emit('myEvent', "This is custom event data2")
  }, 2000)

  //3.
  // socket.on('message', (data) => {
  //   console.log(data);
  // })
  // socket.on('myEvent2', (data) => {
  //   console.log(data);
  // })

  //4. Broadcasting //in this case all connected user
  // io.sockets.emit('firstBroadcasting', "Hello everyone")

  
  //6. chat
  // socket.on('chat', function(data){
  //   io.emit('chat-transition', data);
  // })

  //7. CREATE ROOM
  socket.join('kitchen-room')
  io.sockets.in('kitchen-room').emit('cooking', "Fried rice")

  socket.join('bed-room')
  const bedRoomSize = io.sockets.adapter.rooms.get('bed-room').size;
  io.sockets.in('bed-room').emit('sleeping', "I am sleeping="+ bedRoomSize)
  io.sockets.in('bed-room').emit('rest', "I am taking rest="+ bedRoomSize)

  //disconnect
  socket.on('disconnect', function() {
    console.log("User disconnected");
  })
})

//namespace is used for grouping the connection
//5. namespace one
// const nspOne = io.of('/nspOne');
// nspOne.on('connection', function(socket){
//   console.log("User connected from Namespace One", socket.id);

//   nspOne.emit('myEvent', "Message from namespace one");
// })


// html file 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// express server listen
expressServer.listen(3000, () => {
  console.log("express server is running on 3000");
})