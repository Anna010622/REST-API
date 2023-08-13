import express from 'express';
import {
	userSchema,
	userUpdateSubscriptionSchema,
	userEmailSchema,
} from '../schemas/user-schema.js';
import { ctrlWrapper, validateBody } from '../decorators/index.js';
import { isEmptyBody, authenticate, upload } from '../middlewares/index.js';
import {
	signUp,
	verify,
	resendVerifyEmail,
	signIn,
	getCurrent,
	signOut,
	updateSubscription,
	updateAvatar,
} from '../controllers/auth-controllers.js';

const authRouter = express.Router();

authRouter.post(
	'/register',
	isEmptyBody,
	validateBody(userSchema),
	ctrlWrapper(signUp)
);

authRouter.get('/verify/:verificationToken', ctrlWrapper(verify));

authRouter.post(
	'/verify',
	validateBody(userEmailSchema),
	ctrlWrapper(resendVerifyEmail)
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

authRouter.patch(
	'/avatars',
	authenticate,
	upload.single('avatarURL'),
	ctrlWrapper(updateAvatar)
);

export default authRouter;
