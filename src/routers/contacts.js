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
import { upload } from "../middlewares/multer.js";




const router = Router();


router.use(authenticate);

router.get(
    '/',
    ctrlWrapper(getAllContactsController));

router.get(
    '/:contactId',
    isValidId,
    ctrlWrapper(getContactByIdController)
);


router.post(
    '/register',
    validateBody(createContactShema),
    ctrlWrapper(createContactController),
);

router.post(
    '/',
    upload.single('photo'),
    validateBody(createContactShema),
    ctrlWrapper(createContactController)
);

router.delete(
    '/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController)
);


    // router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.patch(
    '/:contactId',
    isValidId,
    upload.single('photo'),
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController)
);



export default router;
