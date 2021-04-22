const express = require('express');
const router = express.Router();
const Channel = require('./../models/Channel');
const { requireToken } = require('../middleware/auth');

// Get All Channels
router.get('/', (req, res, next) => {
	Channel.find()
		.populate('messages')  //was messages.sender
		.then((channels) => res.json(channels))
		.catch(next);
});

// Get One Channel
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Channel.findById(id)
		.then((channel) => res.json(channel))
		.catch(next);
});

// Create Channel
router.post('/', requireToken, (req, res, next) => {
	const channelData = req.body;
	Channel.create(channelData)
		.then((channel) => res.status(201).json(channel))
		.catch(next);
});

// Update Channel
router.patch('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	const channelData = req.body;
	Channel.findOneAndUpdate({ _id: id }, channelData, { new: true })
		.then((channel) => res.json(channel))
		.catch(next);
});

// Delete Channel
router.delete('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	Channel.findOneAndDelete({ _id: id })
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
