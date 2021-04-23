//https://github.com/davidzas/back-end-socketio/blob/master/server.js

//#region [Blue]
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;
const Channel = require('./models/Channel');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = require('socket.io')(server, {
    cors: {
    //   origin: '*',
       origin: "http://localhost:3000"
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// Controllers
const usersController = require('./controllers/users');
app.use('/users', usersController);
const channelsController = require('./controllers/channels');
app.use('/channels', channelsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);



server.listen(port, () => {
    console.log(`server listening on *:${port}`);
});

io.on('connection', (socket) => { 
    socket.emit('connection', null);

    socket.on('general-channel-join', id => {
        socket.emit('connection-general', null);
        console.log('Joined General channel.');
    })

    socket.on('channel-join', id => {

        // TODO: add join/leave code here - use socket.io rooms?
    });

    // 2) Listen for send-message event from one client and emit it to all other connected clients
    socket.on('send-message', message => {
       console.log(`${message.messageData.sender}: ${message.messageData.text}`);
       io.emit('message', message);
    });

    socket.on('disconnect', () => {

        //  io.emit('channel', channel);

    });
});
//#endregion
