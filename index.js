//https://github.com/davidzas/back-end-socketio/blob/master/server.js

getCollection = require('./db/connection');

//#region [Lime]
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);

const port = process.env.PORT || 8080;

var STATIC_CHANNELS = [{
    name: 'General',
    participants: 0,
    id: 0,
    sockets: []
}, {
    name: 'Private 1',
    participants: 0,
    id: 1,
    sockets: []
},
{
    name: 'Private 2',
    participants: 0,
    id: 2,
    sockets: []
}];


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
const usersController = require('./controllers/users');
app.use('/users', usersController);
const channelsController = require('./controllers/channels');
app.use('/channels', channelsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);

const io = require('socket.io')(server, {
    cors: {
    //   origin: '*',
      origin: "http://localhost:3000",
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

server.listen(port, () => {
    console.log(`server listening on *:${port}`);
});

io.on('connection', (socket) => { 
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        STATIC_CHANNELS.forEach(c => {
            if (c._id === id) {
                if (c.sockets.indexOf(socket._id) == (-1)) {
                    c.sockets.push(socket._id);
                    c.participants = c.sockets.length;
                    io.emit('channel', c);
                    console.log(`Joined ${c.name} channel.`);
                }
            } else {
                let index = c.sockets.indexOf(socket._id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants = c.sockets.length;
                    io.emit('channel', c);
                    console.log(`Left ${c.name} channel.`);
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
            let index = c.sockets.indexOf(socket._id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants = c.sockets.length;
                io.emit('channel', c);
            }
        });
    });
});

// app.get('/getChannels', (req, res) => {
//     res.json({
//         channels: STATIC_CHANNELS
//     })
// });
//#endregion
