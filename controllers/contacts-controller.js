import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import contactSchema from '../schemas/contact-schema.js';

export const getAll = async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
};

export const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);
		if (!contact) {
			throw HttpError(404);
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
};

export const add = async (req, res, next) => {
	try {
		const { error, value } = contactSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const newContact = await addContact(value);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
};

export const deleteById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const deletedContact = await removeContact(contactId);
		if (!deletedContact) {
			throw HttpError(404);
		}
		res.json({ message: 'contact deleted' });
	} catch (error) {
		next(error);
	}
};

export const updateById = async (req, res, next) => {
	try {
		const objectKeys = Object.keys(req.body);
		if (objectKeys.length === 0) {
			throw HttpError(400, 'missing fields');
		}

		const { error, value } = contactSchema.validate(req.body);

		if (error) {
			throw HttpError(400, error.message);
		}
		const { contactId } = req.params;

		const updatedContact = await updateContact(contactId, value);
		if (!updatedContact) {
			throw HttpError(404);
		}
		res.json(updatedContact);
	} catch (error) {
		next(error);
	}
};
