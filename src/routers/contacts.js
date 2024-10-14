import { Router } from "express";
import {
    getAllContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    patchContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
    createContactShema,
    updateContactSchema
} from "../validation/contact.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";


const router = Router();


router.use(authenticate);

router.get(
    '/',
    checkRoles(ROLES.ADMIN),
    ctrlWrapper(getAllContactsController));

router.get(
    '/:contactId',
    checkRoles(ROLES.ADMIN, ROLES.USER),
    isValidId,
    ctrlWrapper(getContactByIdController)
);

router.post('/register',
    validateBody(createContactShema),
    ctrlWrapper(createContactController),
);

router.post(
    '/',
    checkRoles(ROLES.ADMIN, ROLES.USER),
    validateBody(createContactShema),
    ctrlWrapper(createContactController)
);

router.delete(
    '/:contactId',
    checkRoles(ROLES.ADMIN),
    isValidId,
    ctrlWrapper(deleteContactController)
);


    // router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.patch(
    '/:contactId',
    checkRoles(ROLES.ADMIN, ROLES.USER),
    isValidId,
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController)
);



export default router;
