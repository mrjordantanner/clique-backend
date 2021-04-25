//https://github.com/davidzas/back-end-socketio/blob/master/server.js

//#region [Lime]
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;

const Message = require('./models/Message');

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*',);
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
const usersController = require('./controllers/users');
app.use('/users', usersController);
const channelsController = require('./controllers/channels');
app.use('/channels', channelsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);
const generalController = require('./controllers/general');
app.use('/general', generalController);

// Configure Socket
const io = require('socket.io')(server, {
    cors: {
      origin: '*',

    }
});

io.on('connection', (socket) => { 
    socket.emit('connection', null);

    // socket.on('channel-join', (user, channelId) => {
    // });

    // Listen for send-message event from one client and emit it to all other connected clients
    socket.on('send-message', message => {
       console.log(`${message.messageData.sender}: ${message.messageData.text}`);
       io.emit('push', message);
    });

    // socket.on('disconnect', () => {
    // });
});


// Server
server.listen(port, () => {
  console.log(`server listening on *:${port}`);
});


//endregion
