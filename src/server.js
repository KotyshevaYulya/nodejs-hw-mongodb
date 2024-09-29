import { env } from "./utils/env.js";
import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import contactsRouter from "./routers/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

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

    app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json']
  }),
    );

    app.use(contactsRouter);

    app.use('*', notFoundHandler);

    app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}
