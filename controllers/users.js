const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');
const User = require('./../models/User');

// Get all
router.get('/', (req, res, next) => {
	User.find({})
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

// Get One 
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	User.findById(id)
		.then((user) => res.json(user))
		.catch(next);
});

// Sign Up
router.post('/create', (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => ({
			name: req.body.name,
			password: hash,
		}))
		.then((user) => User.create(user))
		.then((user) => res.status(201).json(user))
		.catch(next);
});

// Sign In
router.post('/login', (req, res, next) => {
	User.findOne({ name: req.body.name })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next);
});

// router.post('/login', passport.authenticate('local'), (req, res, next) => {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
// 	console.log('Passport authentication successful for '+ req.user.username)
// 	.then()
//     // res.redirect('/users/' + req.user.username);

//   });



// UPDATE
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const userData = req.body;
	User.findOneAndUpdate({ _id: id }, userData, { new: true })
		.then((user) => res.json(user))
		.catch(next);
});

// Delete
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	User.findOneAndDelete({ _id: id })
		.then(() => res.sendStatus(204))
		.catch(next);
});



module.exports = router;
