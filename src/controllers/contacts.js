import { getAllContacts, getContactById, createContact, deleteContact, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";

export const getAllContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();

        res.status(200).json({
        status: 200,
        massage: "Successfully found contacts!",
        data: contacts,
    });
    } catch (error) {
        next(error);
    }
};

export const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (contact === null) {
            throw createHttpError(404, 'Contact not found');
        };

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });

    } catch (error) {
        console.error(error);
        next(error);
    };
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully create contact!',
        data: contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Student not found'));
        return;
    }

    res.status(204).send();
};


export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;
    const contact = await updateContact(contactId, body);

        if (contact === null) {
            throw createHttpError(404, 'Contact not found');
        };


    res.send({
        status: 200,
        massage: 'Successfully patched a contact!',
        data: contact,
    })
}
