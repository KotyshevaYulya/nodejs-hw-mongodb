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
import { createContactShema, updateContactSchema } from "../validation/contact.js";
import { isValidId } from "../middlewares/isValidId.js";


const router = Router();

    router.get('/contacts', ctrlWrapper(getAllContactsController));

    router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

    router.post('/contacts', validateBody(createContactShema), ctrlWrapper(createContactController));

    router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

    // router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

    router.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;
