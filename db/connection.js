require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI =
	process.env.NODE_ENV === 'production'
		? process.env.DB_URL
		: 'mongodb://localhost/chat-app';

let database;

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true 
	},
	{
		function (err, db) {
		database = db;
	}})
	.then(() => {
		console.log('mongoose connected to db.');
		console.log(`DB ${database}`)
	})
	.catch(() => {
		console.log('db connection failed!');
	});

module.exports.database = database;
module.exports = mongoose;

// {
// 	function (err, db) {
// 	database = db;
// }}