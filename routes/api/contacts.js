const express = require("express");

const contactsController = require("../../controllers/contactsController");
const validation = require("../../middlewares/validation");
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");
const auth = require("../../middlewares/auth");
const { joiContact, joiFavoriteField } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, tryCatchMiddleware(contactsController.getAllContacts));

router.get(
    '/example',
    tryCatchMiddleware(contactsController.contactExample)
);

router.get(
  "/:contactId",
  auth,
  tryCatchMiddleware(contactsController.getOneContact)
);

router.post(
  "/",
  auth,
  validation(joiContact),
  tryCatchMiddleware(contactsController.addContact)
);

router.delete(
  "/:contactId",
  auth,
  tryCatchMiddleware(contactsController.deleteContact)
);

router.put(
  "/:contactId",
  auth,
  validation(joiContact),
  tryCatchMiddleware(contactsController.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(joiFavoriteField),
  tryCatchMiddleware(contactsController.updateFavouriteField)
);



module.exports = router;
