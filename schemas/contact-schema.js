import Joi from 'joi';

export const contactSchema = Joi.object({
	name: Joi.string()
		.required()
		.min(3)
		.max(20)
		.pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
			name: 'Name',
		})
		.messages({
			'string.pattern.name':
				'Name may contain only letters, apostrophe, dash and spaces',
			'any.required': `missing required name field`,
		}),
	email: Joi.string().email().required().messages({
		'any.required': `missing required email field`,
	}),
	phone: Joi.string()
		.required()
		.pattern(/^\+?3?8?(0\d{9})$/, { name: 'Phone' })
		.min(7)
		.max(12)
		.messages({
			'any.required': `missing required phone field`,
			'string.pattern.name':
				'The phone number must be in a valid format: +380 ## ### #### or 0## ### ####',
		}),
	favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		'any.required': `missing field favorite`,
	}),
});
