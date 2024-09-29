import { raw } from "express";
import { ContactsColection } from "../models/contact.js";
import createHttpError from "http-errors";

export const getAllContacts = async () => {
    const contacts = await ContactsColection.find();
    return contacts;
};

export const getContactById =  async (contactId) => {
    const contact = await ContactsColection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsColection.create(payload);
    return contact;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsColection.findOneAndDelete({
        _id: contactId,
    });
    return contact;
};

export const updateContact = async (id, payload) => {
    const contact = await ContactsColection.findByIdAndUpdate(id, payload, {
        new: true,
    });

    return contact;
}



