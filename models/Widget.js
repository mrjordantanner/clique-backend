const {mongoose} = require('../db/connection');

const WidgetSchema = new mongoose.Schema(
	{
        userId: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		shape: {
			type: String,
			required: true,
		},
		channelId: {
			type: String,
			required: false,
		},
        channelSlot: {
            type: String,
			required: false,
        },
	},
	{
		timestamps: true
	}
);

module.exports = WidgetSchema;
