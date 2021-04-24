//https://github.com/davidzas/back-end-socketio/blob/master/server.js

//#region [Blue]
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;

// app.use(cors({ 
//     origin: 'https://jts-clique.herokuapp.com/',
//     'Access-Control-Allow-Origin': '*',
// }))

app.use(cors());

// app.use(cors({ 
//     origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',        'Access-Control-Allow-Origin': '*', }))

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

// Server
server.listen(port, () => {
    console.log(`server listening on *:${port}`);
});


// Sockets
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    //   'Access-Control-Allow-Origin': '*',

        // 'headers': {
        //     'Access-Control-Allow-Headers': '*',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        // },
    }
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


// Jen's code

// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')

// const messageRoutes = require('./app/routes/message_routes')
// const userRoutes = require('./app/routes/user_routes')

// const errorHandler = require('./lib/error_handler')

// const db = require('./config/db')

// const auth = require('./lib/auth')

// mongoose.Promise = global.Promise

// mongoose.connect(db, { useMongoClient: true })

// const app = express()

// app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:7165' }))

// const port = process.env.PORT || 4741

// app.use((req, res, next) => {
//   if (req.headers.authorization) {
//     const auth = req.headers.authorization
//     req.headers.authorization = auth.replace('Token token=', 'Bearer ')
//   }
//   next()
// })

// app.use(auth)

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// app.use(messageRoutes)
// app.use(userRoutes)

// app.use(errorHandler)

// const server = app.listen(port, () => {
//   console.log('connected to port: ' + port)
// })

// const io = require('socket.io')(server)

// app.set('socketio', io)

// io.on('connect', socket => {
//   socket.emit('id', socket.id)
// })

// module.exports = app