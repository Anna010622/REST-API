import Joi from 'joi';

export const userSchema = Joi.object({
	password: Joi.string().required().min(6).messages({
		'any.required': `missing required password field`,
	}),
	email: Joi.string().email().required().messages({
		'any.required': `missing required email field`,
	}),
	subscription: Joi.string(),
});

export const userUpdateSubscriptionSchema = Joi.object({
	subscription: Joi.string().required().messages({
		'any.required': `missing field subscription`,
	}),
});
