import gravatar from 'gravatar';
import Jimp from 'jimp';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { unlink } from 'node:fs';
import { HttpError } from '../helpers/index.js';
import User from '../models/user.js';

const { JWT_SECRET } = process.env;

export const signUp = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}

	const avatarURL = gravatar.url(email, {
		protocol: 'http',
		s: '250',
		d: 'retro',
	});

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({
		email,
		password: hashedPassword,
		avatarURL,
	});

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
			avatarURL,
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

export const updateAvatar = async (req, res) => {
	const { _id } = req.user;

	if (!req.file) throw HttpError(400);
	const { path: oldPath, filename } = req.file;

	await Jimp.read(oldPath).then(image => {
		return image
			.contain(
				250,
				250,
				Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
			)
			.write(oldPath);
	});

	const newPath = path.join('public', 'avatars', filename);
	await fs.rename(oldPath, newPath);

	unlink(path.join('public', req.user.avatarURL), err => {
		if (err) console.log(err.message);
	});

	const avatarURL = path.join('avatars', filename);

	await User.findOneAndUpdate(
		_id,
		{ avatarURL },
		{
			new: true,
		}
	);
	res.json({ avatarURL });
};
