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

// Controllers
const usersController = require('./controllers/users');
app.use('/users', usersController);
const channelsController = require('./controllers/channels');
app.use('/channels', channelsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    //   origin: "http://localhost:3000" || 'https://jts-clique.herokuapp.com/',
    }
});

app.set('socketio', io);

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'https://jts-clique.herokuapp.com/');
    next();
})

server.listen(port, () => {
    console.log(`server listening on *:${port}`);
});

// const { database } = require('./db/connection'); 

// function getChannels() {
//     const cursor =  database.collection('channels').find();
//             return cursor.map((channel) => {
//             console.log(`Channel: ${channel.name}`)
// 	});
// }


io.on('connection', (socket) => { 
    socket.emit('connection', null);

    socket.on('general-channel-join', id => {
        socket.emit('connection-general', null);
        console.log('Joined General channel.');
    })

    socket.on('channel-join', id => {

        // getChannels().forEach(channel => {
        //     if (channel._id === id) {
        //         if (channel.sockets.indexOf(socket._id) == (-1)) {
        //             channel.sockets.push(socket._id);
        //             channel.participants = channel.sockets.length;
        //             io.emit('channel', channel);
        //             console.log(`Joined ${channel.name} channel.`);
        //         }
        //     } else {
        //         let index = channel.sockets.indexOf(socket._id);
        //         if (index != (-1)) {
        //             channel.sockets.splice(index, 1);
        //             channel.participants = channel.sockets.length;
        //             io.emit('channel', channel);
        //             console.log(`Left ${channel.name} channel.`);
        //         }
        //     }
        // });
        // return id;
    });

    // 2) Listen for send-message event from one client and emit it to all other connected clients
    socket.on('send-message', message => {
       console.log(`${message.messageData.sender}: ${message.messageData.text}`);
       io.emit('message', message);
    });

    socket.on('disconnect', () => {
        // getChannels().forEach(channel => {
        //     let index = channel.sockets.indexOf(socket._id);
        //     if (index != (-1)) {
        //         channel.sockets.splice(index, 1);
        //         channel.participants = channel.sockets.length;
        //         io.emit('channel', channel);
        //     }
        // });
    });
});
//#endregion
