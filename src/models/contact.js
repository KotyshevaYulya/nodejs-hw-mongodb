import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            required: true,
        },
       parentId: { type: Schema.Types.ObjectId, ref: 'users' },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ContactsColection = model('Contact', contactsSchema);

