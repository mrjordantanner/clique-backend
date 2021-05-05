const express = require('express');
const router = express.Router();
const Channel = require('./../models/Channel');
const { requireToken } = require('../middleware/auth');

// Get All Channels 
router.get('/', (req, res, next) => {
	Channel.find()
	// Channel.find( { '_id': { $ne: '001' } } )
		.populate('messages')  //  exclude General 
		.then((channels) => res.json(channels))
		.catch(next);
});

// Get One Channel by id
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Channel.findById(id)
		.then((channel) => res.json(channel))
		.catch(next);
});

// // Get One Channel by name
// router.get('/name/:name', (req, res, next) => {
// 	const name = req.params.name;
// 	Channel.findOne( { 'name': name } )
// 		.then((channel) => res.json(channel))
// 		.catch(next);
// });

// Create Channel
router.post('/', 
// requireToken, 
(req, res, next) => {
	const channelData = req.body;
	Channel.create(channelData)
		.then((channel) => res.status(201).json(channel))
		.catch(next);
});

// Update Channel
router.patch('/:id', 
// requireToken, 
(req, res, next) => {
	const id = req.params.id;
	const channelData = req.body;
	Channel.findOneAndUpdate({ _id: id }, channelData, { new: true })
		.then((channel) => res.json(channel))
		.catch(next);
});

// Delete Channel
router.delete('/:id', 
// requireToken, 
(req, res, next) => {
	const id = req.params.id;
	Channel.findOneAndDelete({ _id: id })
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
