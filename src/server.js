import { env } from "./utils/env.js";
import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { getAllContacts, getContactById } from './services/contacts.js';


dotenv.config();

const PORT = Number(process.env.PORT);

export default function setupServer() {
    const app = express();

    app.use(cors());

    app.use(
        pino({

            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.send("Hello world!!!!");
    });


    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            massage: "Successfully found contacts!",
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactById(contactId);

        // console.log(contact);
        //     if (contact === null) {
        //          res.status(404).json({
        //             message: 'Contact not found'
        //         });
        //     }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });

        }
        catch (error) {
            console.error(error);
            res.status(404).json({
                    message: 'Contact not found'
                });
        };

    });



    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: "Not faund",
        });
    });



    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}
