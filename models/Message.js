const {mongoose} = require('../db/connection');

const MessageSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		sender: {
			type: String,
			required: true,
		},
		channelId: {
			type: String,
			required: true,
		},
		socketId: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true
	}
);

module.exports = MessageSchema;
