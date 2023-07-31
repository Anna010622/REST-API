import express from 'express';
import {
	getAll,
	getById,
	add,
	deleteById,
	updateById,
} from '../../controllers/contacts-controller.js';
import { ctrlWrapper, validateBody } from '../../decorators/index.js';
import contactSchema from '../../schemas/contact-schema.js';
import { isEmptyBody } from '../../middlewares/index.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAll));
contactsRouter.get('/:contactId', ctrlWrapper(getById));
contactsRouter.post(
	'/',
	isEmptyBody,
	validateBody(contactSchema),
	ctrlWrapper(add)
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteById));
contactsRouter.put(
	'/:contactId',
	isEmptyBody,
	validateBody(contactSchema),
	ctrlWrapper(updateById)
);

export default contactsRouter;
