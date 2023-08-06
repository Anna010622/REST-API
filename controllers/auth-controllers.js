import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { HttpError } from '../helpers/index.js';
import User from '../models/user.js';

const { JWT_SECRET } = process.env;

export const signUp = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({ email, password: hashedPassword });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const isCorrectPassword = await bcrypt.compare(password, user.password);

	if (!isCorrectPassword) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

export const getCurrent = (req, res) => {
	const { email, subscription } = req.user;

	res.json({ email, subscription });
};

export const signOut = async (req, res) => {
	const { _id } = req.user;
	await User.findOneAndUpdate(_id, { token: '' });
	res.status(204).json({});
};

export const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const updatedUser = await User.findOneAndUpdate(_id, req.body, {
		new: true,
	});

	res.json(updatedUser);
};
