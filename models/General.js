const { mongoose } = require('../db/connection');
const MessageSchema = require('./Message');

const GeneralSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
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

module.exports = mongoose.model('General', GeneralSchema);
