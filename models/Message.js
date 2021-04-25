const {mongoose} = require('../db/connection');

const MessageSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: false,
		},
		sender: {
			type: String,
			required: true,
		},
		channelId: {
			type: String,
			required: false,
		}
	},
	{
		timestamps: true
	}
);

module.exports = MessageSchema;
