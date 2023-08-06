import { HttpError } from '../helpers/index.js';
import Contact from '../models/contact.js';

export const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, ...query } = req.query;
	const skip = (page - 1) * limit;
	const total = await Contact.find({ owner, ...query });
	const contacts = await Contact.find({ owner, ...query }, '', {
		skip,
		limit,
	});
	res.json({
		page,
		result: contacts,
		total: total.length,
		total_pages: Math.ceil(total.length / limit),
	});
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
	const { _id: owner } = req.user;
	const newContact = await Contact.create({ ...req.body, owner });
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
