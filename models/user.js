import { model, Schema } from 'mongoose';
import { handleSaveError, handleUpdateValidate } from './hooks.js';

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, 'Set password for user'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		subscription: {
			type: String,
			enum: {
				values: ['starter', 'pro', 'business'],
				message:
					'{VALUE} is not supported? it must be one of ["starter", "pro", "business"]',
			},
			default: 'starter',
		},
		token: String,
		avatarURL: String,
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', handleUpdateValidate);

userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
