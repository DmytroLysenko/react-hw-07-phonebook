import { createAction } from "@reduxjs/toolkit";

const contactsLoad = createAction("contacts/load");
const contactAdd = createAction("contact/add");
const contactRemove = createAction("contact/remove");
const contactDetailsSet = createAction("contact/detailsSet");
const contactDetailsClose = createAction("contact/detailsClose");
const messageSet = createAction("message/add");
const messageClose = createAction("message/remove");
const filter = createAction("contacts/filter");

export default {
  contactsLoad,
  contactAdd,
  contactRemove,
  contactDetailsSet,
  contactDetailsClose,
  messageSet,
  messageClose,
  filter,
};
