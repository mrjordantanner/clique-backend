//https://github.com/davidzas/back-end-socketio/blob/master/server.js
var app = require('express')();
var server = require('http').createServer(app);
const PORT = 8080;
// var io = require('socket.io')(http);
var STATIC_CHANNELS = [{
    name: 'General',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Private 1',
    participants: 0,
    id: 2,
    sockets: []
},
{
    name: 'Private 2',
    participants: 0,
    id: 3,
    sockets: []
}];

const io = require('socket.io')(server, {
    cors: {
    //   origin: '*',
      origin: "http://localhost:3000",
    }
});

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

// socket object may be used to send specific messages to the new connected client
io.on('connection', (socket) => { 
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });


    socket.on('send-message', message => {
        io.emit('message', message);
    });


    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});

app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});