const express = require('express');
const router = express.Router();
const General = require('./../models/General');
const { requireToken } = require('../middleware/auth');

// Get General channel
router.get('/name/General', (req, res, next) => {
	General.findOne( { 'name': 'General' } )
		.then((channel) => res.json(channel))
		.catch(next);
});

// Create General Channel
router.post('/', requireToken, (req, res, next) => {
	const channelData = req.body;
	General.create(channelData)
		.then((channel) => res.status(201).json(channel))
		.catch(next);
});

// Update General Channel
router.patch('/General', requireToken, (req, res, next) => {
	const channelData = req.body;
	General.findOneAndUpdate({ 'name': 'General' }, channelData, { new: true })
		.then((channel) => res.json(channel))
		.catch(next);
});

// Delete General Channel
router.delete('/General', requireToken, (req, res, next) => {
	General.findOneAndDelete({ 'name': 'General' })
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
