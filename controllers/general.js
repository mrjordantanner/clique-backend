const express = require('express');
const router = express.Router();
const General = require('../models/General');
const { requireToken } = require('../middleware/auth');

// Get Channel
router.get('/', (req, res, next) => {
	const name = 'General';
	General.findOne( { 'name': name } )
		.then((channel) => res.json(channel))
		.catch(next);
});

// Create Channel
router.post('/', requireToken, (req, res, next) => {
	const channelData = req.body;
	General.create(channelData)
		.then((channel) => res.status(201).json(channel))
		.catch(next);
});

module.exports = router;
