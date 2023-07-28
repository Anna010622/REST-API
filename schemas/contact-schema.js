import Joi from 'joi';

const contactSchema = Joi.object({
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
	phone: Joi.string().required().replace(/\D+/g, '').min(7).max(12).messages({
		'any.required': `missing required phone field`,
	}),
});

export default contactSchema;
