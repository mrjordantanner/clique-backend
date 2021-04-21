const mongoose = require('../db/connection');

const MessageSchema = require('./Message');

const ChannelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		participants: {
			type: Number,
			required: false,
		},
        sockets: {
			type: Array,
			required: false,
		},
        messages: [MessageSchema]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Channel', ChannelSchema);
