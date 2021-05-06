
const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');

// require channel model
const User = require('./../models/User');

// CREATE widget
// /widgets
router.post('/', 
// requireToken, 
(req, res, next) => {
	const widgetData = req.body;
	const userId = widgetData.userId;
	User.findById(userId)
		.then((user) => {
			user.widgets.push(widgetData);
			return user.save();
		})
		.then((user) => res.status(201).json({ user: user }))
		.catch(next);
	});


// DELETE widget  
// /widgets/:id
router.delete('/:id', 
// requireToken, 
(req, res, next) => {
	const id = req.params.id;
	User.findOne({ 'widgets._id': id })
		.then((user) => {
			user.widgets.id(id).remove();
			return user.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

// UPDATE widget
// /widgets/:id
router.patch('/:id', 
// requireToken, 
(req, res, next) => {
	const id = req.params.id;
	const widgetData = req.body;
	User.findOne({
		'widgets._id': id,
	})
		.then((user) => {
			const widget = user.widgets.id(id);
			widget.set(widgetData);
			return user.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
