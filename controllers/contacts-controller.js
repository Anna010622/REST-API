import { HttpError } from '../helpers/index.js';
import Contact from '../models/contact.js';

export const getAll = async (_, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

export const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);
	if (!contact) {
		throw HttpError(404);
	}
	res.json(contact);
};

export const add = async (req, res) => {
	const newContact = await Contact.create(req.body);
	res.status(201).json(newContact);
};

export const deleteById = async (req, res) => {
	const { contactId } = req.params;
	const deletedContact = await Contact.findByIdAndDelete(contactId);
	if (!deletedContact) {
		throw HttpError(404);
	}
	res.json({ message: 'contact deleted' });
};

export const updateById = async (req, res) => {
	const { contactId } = req.params;

	const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!updatedContact) {
		throw HttpError(404);
	}
	res.json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;

	const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!updatedContact) {
		throw HttpError(404);
	}
	res.json(updatedContact);
};
