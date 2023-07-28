import express from 'express';
import {
	getAll,
	getById,
	add,
	deleteById,
	updateById,
} from '../../controllers/contacts-controller.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAll);
contactsRouter.get('/:contactId', getById);
contactsRouter.post('/', add);
contactsRouter.delete('/:contactId', deleteById);
contactsRouter.put('/:contactId', updateById);

export default contactsRouter;
