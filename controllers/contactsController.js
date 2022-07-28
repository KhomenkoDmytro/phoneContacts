const { Contact } = require("../models/contact");
const { default:axios } = require('axios');
const randomEmail = require('random-email');
const { v4: uuidv4 } = require('uuid');


const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id });
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  await isYourContact(_id, contactId);
  const contact = await Contact.find({ owner: _id, _id: contactId });
  if (!contact) {
    const error = new Error(`Contact with id: ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  await isYourContact(_id, contactId);
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    const error = new Error(`Contact with id: ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(deletedContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  await isYourContact(_id, contactId);
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  res.status(201).json(updatedContact);
};

const updateFavouriteField = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;
  await isYourContact(_id, contactId);
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updatedContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  res.json(updatedContact);
};

async function isYourContact(ownerId, contactId) {
  const contact = await Contact.find({ owner: ownerId, _id: contactId });
  if (JSON.stringify(contact) === "[]") {
    const error = new Error(`Contact with id: ${contactId} not found`);
    error.status = 404;
    throw error;
  }
};

async function contactExample(req, res) {
  const {
    data: { results },
  } = await axios.get('https://randomuser.me/api/');
  res.json({
    name: results[0].name.first + ' ' + results[0].name.last,
    phone: results[0].phone,
    email: results[0].email,
    _id: uuidv4(),
    favorite: false,
    owner: {
      _id: uuidv4(),
      email: randomEmail(),
    },
  });
};

module.exports = {
  getAllContacts,
  getOneContact,
  addContact,
  deleteContact,
  updateContact,
  updateFavouriteField,
  contactExample
};
