const {mongoose} = require('../db/connection');
const WidgetSchema = require('./Widget');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: false,
			default: null,
		},
		loggedIn: {
			type: Boolean,
			default: false,
			required: false,
		},
		channel: {
			type: String,
			required: false,
			default: null,
		},
		xp: {
			type: Number,
			required: false,
			default: 0
		},
		widgets: [WidgetSchema],
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			// ret is the returned Mongoose document
			// transform: (_doc, ret) => {
			// 	delete ret.password;
			// 	return ret;
			// },
		},
	}
);

module.exports = mongoose.model('User', UserSchema);
