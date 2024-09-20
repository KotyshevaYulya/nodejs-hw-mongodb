import mongoose from "mongoose";

async function initMongoConnection() {
    try {
        const url = process.env.MONGODB_URL;
        const user = process.env.MONGODB_USER;
        const pwd = process.env.MONGODB_PASSWORD;

            await mongoose.connect(
                    `mongodb+srv://${user}:${pwd}@${url}/?retryWrites=true&w=majority&appName=Cluster0`,
            );
        console.log("Mongo connection successfully established!");
} catch (error) {
        console.error(error);
        throw error;
}
};


export default initMongoConnection;
