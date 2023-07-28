import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
import { formatContact } from '../helpers/index.js';

const contactsPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
};

export const getContactById = async contactId => {
	const contacts = await listContacts();
	const contact = contacts.find(contact => contact.id === contactId);
	return contact || null;
};

export const removeContact = async contactId => {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [deletedContact] = contacts.splice(index, 1);

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return deletedContact;
};

export const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone: formatContact(phone),
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

export const updateContact = async (id, { name, email, phone }) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === id);
	if (index === -1) {
		return null;
	}
	contacts[index] = { id, name, email, phone: formatContact(phone) };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
};
