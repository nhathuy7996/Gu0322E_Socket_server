var server = require('http').createServer()
var io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

console.log('Socket-io server running on 8080.');
console.log('Emit to "socketio-client" or "socketio-client-ack" for debugging.');

io.on('connection', function (socket) {

  console.log(`Hello `+ socket.id);

  socket.emit('message', { hello: 'world' });
  socket.on('socketio-client', function (data) {
    console.log('type: ', typeof (data), ' \ndata: ', data, '\n');
    socket.emit('socketio-client', data);
  });
  socket.on('socketio-client-ack', (data, fn) => {
    console.log('on socketio-client-ack: ', data);
    fn(data);
  });

  socket.on('Hello', (data) => {
    console.log('Hello '+data);

    socket.emit('Hello_done', {  });
   
  });

  socket.on('disconnect', () => {
    console.log('Goodbye '+ socket.id);
   
  });
  

});

server.listen(8080);