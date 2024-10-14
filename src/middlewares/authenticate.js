import createHttpError from "http-errors";
import { SessionsColection } from "../models/session.js";
import { UsersCollection } from "../models/user.js";

export const authenticate = async (req, res, next) => {
    const authHeder = req.get('Authorization');

    if (!authHeder) {
        next(createHttpError(401, 'Please provide Authorization header'));
        return;
    };

    const bearer = authHeder.split(' ')[0];
    const token = authHeder.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header shoud be of type Bearer'));
        return;
    };

    const session = await SessionsColection.findOne({ accessToken: token });

    if (!session) {
        next(createHttpError(401, 'Sission not found'));
        return;
    };

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
        next(createHttpError(401, 'Access token expired'));
    };

    const user = await UsersCollection.findById(session.userId);

    if (!user) {
        next(createHttpError(401));
        return;
    };

    req.user = user;

    next();
};
