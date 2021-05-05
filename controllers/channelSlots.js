
const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');

// require channel model
const Channel = require('./../models/Channel');

// CREATE slot
// /channelSlots
router.post('/', 
// requireToken, 
(req, res, next) => {
	const slotData = req.body;
	const channelId = slotData.channelId;
	Channel.findById(channelId)
		.then((channel) => {
			channel.channelSlots.push(slotData);
			return channel.save();
		})
		.then((channel) => res.status(201).json({ channel: channel }))
		.catch(next);
	});


// DELETE slot  
// /channelSlots/:id
router.delete('/:id', 
// requireToken, 
(req, res, next) => {
	const id = req.params.id;
	Channel.findOne({ 'channelSlots._id': id })
		.then((channel) => {
			channel.channelSlots.id(id).remove();
			return channel.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

// UPDATE slot
// /channelSlots/:id
router.patch('/:id', 
// requireToken, 
(req, res, next) => {
	const id = req.params.id;
	const slotData = req.body;
	Channel.findOne({
		'channelSlots._id': id,
	})
		.then((channel) => {
			const channelSlot = channel.channelSlots.id(id);
			channelSlot.set(slotData);
			return channel.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
