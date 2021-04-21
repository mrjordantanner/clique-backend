
const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');

// require channel model
const Channel = require('./../models/Channel');

// CREATE
// POST /messages/
router.post('/', requireToken, (req, res, next) => {
	// get the message data from the body of the request
	const messageData = req.body;
	// get the channel id from the body
	const channelId = messageData.channelId;
	// find the channel by its id
	Channel.findById(channelId)
		.then((channel) => {
			// add message to channel
			channel.messages.push(messageData);
			// save channel
			return channel.save();
		})
		// send response back to client
		.then((channel) => res.status(201).json({ channel: channel }))
		.catch(next);

// https://stackoverflow.com/questions/18856190/use-socket-io-inside-a-express-routes-file/57737798#57737798

//   // grab the id from the request
//   const socketId = req.body.message.socketId

//   // get the io object ref
//   const io = req.app.get('socketio'); 

//   // create a ref to the client socket
//   const senderSocket = io.sockets.connected[socketId]

//   Message.create(req.body.message)
//     .then(message => {

//       // in case the client was disconnected after the request was sent
//       // and there's no longer a socket with that id
//       if (senderSocket) {

//         // use broadcast.emit to message everyone except the original
//         // sender of the request !!! 
//         senderSocket.broadcast.emit('message broadcast', { message })
//       }
//       res.status(201).json({ message: message.toObject() })
//     })
//     .catch(next)
});

// DELETE a message    /messages/:id
router.delete('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	Channel.findOne({ 'messages._id': id })
		.then((channel) => {
			channel.messages.id(id).remove();
			return channel.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

// UPDATE a message
// PATCH /messages/:id
router.patch('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	const messageData = req.body;

	Channel.findOne({
		'messages._id': id,
	})
		.then((channel) => {
			const message = channel.messages.id(id);
			message.set(messageData);
			return channel.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
