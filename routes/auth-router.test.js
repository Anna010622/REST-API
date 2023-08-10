import mongoose from 'mongoose';
import request from 'supertest';
import 'dotenv/config';
import app from '../app.js';
import User from '../models/user.js';

const { DB_HOST_TEST, PORT } = process.env;

describe('test sigIn route', () => {
	let server = null;

	beforeAll(async () => {
		await mongoose.connect(DB_HOST_TEST);
		server = app.listen(PORT);
	});

	afterAll(async () => {
		await mongoose.connection.close();
		server.close();
	});

	afterEach(async () => {
		await User.deleteMany({});
	});

	test('test signIn', async () => {
		const signInData = {
			email: 'test@ukr.net',
			password: '123456',
		};

		await request(app).post('/users/register').send(signInData);

		const { statusCode, body } = await request(app)
			.post('/users/login')
			.send(signInData);

		expect(statusCode).toBe(200);
		expect(body.token).toBeDefined();
		const user = {
			email: typeof body.user.email,
			subscription: typeof body.user.subscription,
		};
		const expected = {
			email: 'string',
			subscription: 'string',
		};
		expect(user).toMatchObject(expected);

		const currentUser = await User.findOne({ email: signInData.email });
		expect(currentUser.email).toBe(signInData.email);
	});
});
