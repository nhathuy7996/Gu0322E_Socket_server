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

  socket.on('disconnect', () => {
    console.log('Goodbye '+ socket.id);
  });

  socket.on('Hello', (data) => {
    let parsedData = JSON.parse(data);

    console.log(`HeroID ${parsedData.Hero} attack enemy ${parsedData.Enemy}`);


    let obj = {
      enemyHP : 50
    }

    socket.emit('Hello_done', obj);
   
  });



  socket.on('OTT_choose', (data) => {
  
    let parsedData = JSON.parse(data);

    let playerChoose = parsedData.ID;

    console.log(`Player choose `+playerChoose);

    let player2 =  Math.round(Math.random(4)) +1;
    let obj = {
      result: result(playerChoose,player2),
      choose: player2
    }

    socket.emit('OTT_result', obj);
   
  });

  

});

server.listen(8080);

function result(Player1, Player2)
{
  
    switch (Player1)
    {
        case 1:
            if (Player2 == 2)
                return -1;

            if (Player2 == 3)
                return 1;
            break;
        case 2:
            if (Player2 == 1)
                return 1;

            if (Player2 == 3)
                return -1;
            break;
        case 3:
            if (Player2 == 1)
                return -1;

            if (Player2 == 3)
                return 1;
            break;
    }

    return 0;
}