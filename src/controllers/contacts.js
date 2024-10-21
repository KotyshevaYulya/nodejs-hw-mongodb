import {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import createHttpError from "http-errors";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";
import { CLOUDINARY } from "../constants/index.js";


export const getAllContactsController = async (req, res, next) => {
    try {

        const { page, perPage } = parsePaginationParams(req.query);
        const { sortBy, sortOrder } = parseSortParams(req.query);
        const filter = parseFilterParams(req.query);

        filter.userId = req.user._id;

        const contacts = await getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
        });

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
        const {_id}  = req.user;

        const contact = await getContactById(contactId, _id);

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
    // const contact = await createContact(req.body);
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env(CLOUDINARY.ENABLE_CLOUDINARY ) === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const contact = await createContact({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        isFavourite: req.body.isFavourite,
        contactType: req.body.contactType,
        userId: req.user._id,
        photo: photoUrl,
    });

    res.status(201).json({
        status: 201,
        message: 'Successfully create contact!',
        data: contact,
    });
};


export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id } = req.user;

    const contact = await deleteContact(contactId, _id);

    if (!contact) {
        next(createHttpError(404, 'Student not found'));
        return;
    }

    res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id } = req.user;
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (env(CLOUDINARY.ENABLE_CLOUDINARY ) === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const result = await updateContact(contactId, _id, {
        ...req.body,
        photo: photoUrl,
    });

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: 'Saccessfully patched a contact!',
        data: result,
    });
};
