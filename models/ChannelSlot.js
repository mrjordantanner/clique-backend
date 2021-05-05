const {mongoose} = require('../db/connection');

const ChannelSlotSchema = new mongoose.Schema(
	{
        channelId: {
			type: String,
			required: true,
		},
		occupantId: {
			type: String,
			required: false,
		},

	},
	{
		timestamps: true
	}
);

module.exports = ChannelSlotSchema;
