
const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');

// require channel model
const Channel = require('./../models/Channel');
const General = require('./../models/General');

// Channel
// POST /messages/
// router.post('/channel', requireToken, (req, res, next) => {
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

// General
// POST /messages/
router.post('/general', requireToken, (req, res, next) => {
	const messageData = req.body;
	General.findOne( { 'name': 'General' } )
		.then((channel) => {
			channel.messages.push(messageData);
			return channel.save();
		})
		// send response back to client
		.then((channel) => res.status(201).json({ channel: channel }))
		.catch(next);
	});

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
