import mongoose from "mongoose";

async function initMongoConnection() {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        const MONGODB_USER = process.env.MONGODB_USER;
        const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
        const MONGODB_DB = process.env.MONGODB_DB;

        await mongoose.connect(`${MONGODB_URL}${MONGODB_USER}:${MONGODB_PASSWORD}${MONGODB_DB}`);
        console.log("Mongo connection successfully established!");
} catch (error) {
        console.error(error);
        throw error;
}
};


export default initMongoConnection;
