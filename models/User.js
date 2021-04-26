const {mongoose} = require('../db/connection');

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
		loggedIn: {
			type: Boolean,
			default: false,
			required: false,
		},
		channel: {
			type: String,
			required: false,
		}
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
