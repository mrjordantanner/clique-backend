
const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');

// require channel model
const Channel = require('./../models/Channel');

// Channel
// POST /messages/
router.post('/', requireToken, (req, res, next) => {
	const messageData = req.body;
	const channelId = messageData.channelId;
	// const channelId = req.params.id;
	console.log(`Sending message to: ${channelId}`);
	Channel.findById(channelId)
		.then((channel) => {
			console.log(`Attempt to push ${messageData.text} into channel: ${channel.name}`);
			channel.messages.push(messageData);
			return channel.save();
		})
		.then((channel) => res.status(201).json({ channel: channel }))
		.catch(next);

// General
// POST /messages/
router.post('/general', requireToken, (req, res, next) => {
	const messageData = req.body;
	Channel.findById('001')
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
