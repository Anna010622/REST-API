import express from 'express';
import {
	getAll,
	getById,
	add,
	deleteById,
	updateById,
	updateStatusContact,
} from '../../controllers/contacts-controller.js';
import { ctrlWrapper, validateBody } from '../../decorators/index.js';
import {
	contactSchema,
	contactUpdateFavoriteSchema,
} from '../../schemas/contact-schema.js';
import {
	isEmptyBody,
	isValidId,
	authenticate,
} from '../../middlewares/index.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAll));
contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getById));
contactsRouter.post(
	'/',
	isEmptyBody,
	validateBody(contactSchema),
	ctrlWrapper(add)
);
contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteById));
contactsRouter.put(
	'/:contactId',
	isValidId,
	isEmptyBody,
	validateBody(contactSchema),
	ctrlWrapper(updateById)
);
contactsRouter.patch(
	'/:contactId/favorite',
	isValidId,
	validateBody(contactUpdateFavoriteSchema),
	ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
