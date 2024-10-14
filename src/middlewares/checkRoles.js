// import createHttpError from "http-errors";
// import { ContactsColection } from "../models/contact.js";
// import { ROLES } from "../constants/index.js";

// export const checkRoles =
//     (...roles) => async (req, res, next) => {
//         const { user } = req;
//         if (!user) {
//             next(createHttpError(401));
//             return;
//         }


//     const { role } = user;
//     if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
//       next();
//       return;
//     }

//     if (roles.includes(ROLES.USER) && role === ROLES.USER) {
//       const { contactId } = req.params;
//       if (!contactId) {
//         next(createHttpError(403));
//         return;
//       }


//         const contact = await ContactsColection.findOne({
//             _id: contactId,
//             parentId: user._id,
//         });

//         if (contact) {
//             next();
//             return;
//             };
//         };


//         next(createHttpError(403));
//     };

import createHttpError from "http-errors";
import { ContactsColection } from "../models/contact.js";
import { ROLES } from "../constants/index.js";

export const checkRoles =
    (...roles) => async (req, res, next) => {
        const { user } = req;
        if (!user) {
            next(createHttpError(401));
            return;
        }

        const { role } = user;

        if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
            next();
        } else if (roles.includes(ROLES.USER) && role === ROLES.USER) {
            const { contactId } = req.params;
            if (!contactId) {
                next(createHttpError(403));
                return;
            }

            const contact = await ContactsColection.findOne({
                _id: contactId,
                parentId: user._id,
            });

            if (contact) {
                next();
            } else {
                next(createHttpError(403));
            }
        } else {
            next(createHttpError(403));
        }
    };
