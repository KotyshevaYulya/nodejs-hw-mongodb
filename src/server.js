import { env } from "./utils/env.js";
import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const PORT = Number(process.env.PORT);

export default function setupServer() {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

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

    app.use(router);

    app.use('/auth/uploads', express.static(UPLOAD_DIR));

    app.use('*', notFoundHandler);

    app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}
