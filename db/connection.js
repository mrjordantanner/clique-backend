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
		useUnifiedTopology: true,
	})
	.then((instance) => {
		console.log('mongoose connected to db.');
		// console.log(`DB ${instance.connections[0].name}`);
		database = instance.connections[0];
		// console.log(`Channels collection: ${database}`);
	})
	.catch(() => {
		console.log('db connection failed!');
	});

module.exports = { database, mongoose };