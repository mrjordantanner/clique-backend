const { mongoose } = require('../db/connection');
const MessageSchema = require('./Message');
const ChannelSlotSchema = require('./ChannelSlot');

const ChannelSchema = new mongoose.Schema(
	{
		// _id: {
		// 	type: String,
		// 	required: true,
		// },
		name: {
			type: String,
			required: true,
		},
		sockets: {
			type: Array,
			required: false,
		},
		channelSlots: [ChannelSlotSchema],
		messages: [MessageSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Channel', ChannelSchema);
