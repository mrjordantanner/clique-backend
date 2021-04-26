require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const mongoURI =
	process.env.NODE_ENV === 'production'
		? process.env.DB_URL
		: 'mongodb://localhost/chat-app';

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((instance) => {
		console.log('mongoose connected to db.');
	})
	.catch(() => {
		console.log('db connection failed!');
	});

module.exports = { mongoose };