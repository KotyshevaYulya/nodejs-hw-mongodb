import { raw } from "express";
import { ContactsColection } from "../models/contact.js";
import createHttpError from "http-errors";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export const  getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsColection.find();

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    };

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    }

    contactsQuery.where('userId').equals(filter.userId);

    // const contactsCount = await ContactsColection.find()
    //     .merge(contactsQuery)
    //     .countDocuments();

    // const contacts = await contactsQuery
    //     .skip(skip)
    //     .limit(limit)
    //     .sort({[sortBy]: sortOrder})
    //     .exec();

    const [contactsCount, contacts] = await Promise.all([

        ContactsColection.find().merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};



export const getContactById =  async (contactId, userId) => {
    const contact = await ContactsColection.findOne({
        _id: contactId,
        userId
    });
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsColection.create(payload);
    return contact;
};


export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsColection.findOneAndDelete({
        _id: contactId,
        userId
    });
    return contact;
};

export const updateContact = async (id, userId, payload) => {
    const contact = await ContactsColection.findOneAndUpdate(
       { _id: id,
            userId
        },
        payload, {
        new: true,
    });

    return contact;
}



