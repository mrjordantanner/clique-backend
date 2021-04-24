const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');
const User = require('./../models/User');

// Get all users
router.get('/', (req, res, next) => {
	User.find({})
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

// Get all users that are logged in
router.get('/loggedIn', (req, res, next) => {
	User.find( { 'loggedIn': true } )
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

// Log In
router.post('/login', (req, res, next) => {
	User.findOne({ name: req.body.name })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.then(console.log(`Logged in as: ${req.body.name}`))
		.catch(next);
});


// router.post('/login', passport.authenticate('local'), (req, res, next) => {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
// 	console.log('Passport authentication successful for '+ req.user.username)
// 	.then()
//     // res.redirect('/users/' + req.user.username);

//   });



// UPDATE by ID
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const userData = req.body;
	User.findOneAndUpdate({ _id: id }, userData, { new: true })
		.then((user) => res.json(user))
		.catch(next);
});

// UPDATE by Name
router.patch('/:name', (req, res, next) => {
	const name = req.params.id;
	const userData = req.body;
	User.findOneAndUpdate(( { 'name': name } ), userData, { new: true })
		.then((user) => res.json(user))
		.catch(next);
});

// MARK AS LOGGED IN by Name
router.patch('/login/:name', (req, res, next) => {
	const name = req.params.name;
	User.findOneAndUpdate(( { 'name': name } ), { loggedIn: true }, { new: true })
		.then((user) => res.json(user))
		.then(console.log(`${req.params.name} marked as LOGGED IN`))
		.catch(next);
});

// MARK AS LOGGED OUT by Name
router.patch('/logout/:name', (req, res, next) => {
	const name = req.params.name;
	User.findOneAndUpdate(( { 'name': name } ), { loggedIn: false }, { new: true })
		.then((user) => res.json(user))
		.then(console.log(`${req.params.name} marked as LOGGED OUT`))
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
