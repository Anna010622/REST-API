import express from 'express';
import {
	userSchema,
	userUpdateSubscriptionSchema,
} from '../schemas/user-schema.js';
import { ctrlWrapper, validateBody } from '../decorators/index.js';
import { isEmptyBody, authenticate } from '../middlewares/index.js';
import {
	signUp,
	signIn,
	getCurrent,
	signOut,
	updateSubscription,
} from '../controllers/auth-controllers.js';

const authRouter = express.Router();

authRouter.post(
	'/register',
	isEmptyBody,
	validateBody(userSchema),
	ctrlWrapper(signUp)
);

authRouter.post(
	'/login',
	isEmptyBody,
	validateBody(userSchema),
	ctrlWrapper(signIn)
);

authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

authRouter.post('/logout', authenticate, ctrlWrapper(signOut));

authRouter.patch(
	'/',
	authenticate,
	validateBody(userUpdateSubscriptionSchema),
	ctrlWrapper(updateSubscription)
);

export default authRouter;
