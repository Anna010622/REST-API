import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';

export const getAll = async (_, res) => {
	const contacts = await listContacts();
	res.json(contacts);
};

export const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);
	if (!contact) {
		throw HttpError(404);
	}
	res.json(contact);
};

export const add = async (req, res) => {
	const newContact = await addContact(req.body);
	res.status(201).json(newContact);
};

export const deleteById = async (req, res) => {
	const { contactId } = req.params;
	const deletedContact = await removeContact(contactId);
	if (!deletedContact) {
		throw HttpError(404);
	}
	res.json({ message: 'contact deleted' });
};

export const updateById = async (req, res) => {
	const { contactId } = req.params;

	const updatedContact = await updateContact(contactId, req.body);
	if (!updatedContact) {
		throw HttpError(404);
	}
	res.json(updatedContact);
};
