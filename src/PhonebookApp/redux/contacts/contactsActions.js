import { createAction } from "@reduxjs/toolkit";

const contactsLoadRequest = createAction("contacts/loadRequest");
const contactsLoadSuccess = createAction("contacts/loadSeccess");
const contactsLoadError = createAction("contacts/loadError");

const contactAddRequest = createAction("contact/addRequest");
const contactAddSuccess = createAction("contact/addSeccess");
const contactAddError = createAction("contact/addError");

const contactRemoveRequest = createAction("contact/removeRequest");
const contactRemoveSuccess = createAction("contact/removeSeccess");
const contactRemoveError = createAction("contact/removeError");

const contactByIdRequest = createAction("contact/byIdRequest");
const contactByIdSuccess = createAction("contact/byIdSeccess");
const contactByIdError = createAction("contact/byIdError");

const contactDetailsSet = createAction("contact/detailsSet");
const contactDetailsClose = createAction("contact/detailsClose");
const messageShow = createAction("message/add");
const messageClose = createAction("message/remove");
const filter = createAction("contacts/filter");
const errorReset = createAction("error/reset");

export {
  contactsLoadRequest,
  contactsLoadSuccess,
  contactsLoadError,
  contactAddRequest,
  contactAddSuccess,
  contactAddError,
  contactRemoveRequest,
  contactRemoveSuccess,
  contactRemoveError,
  contactByIdRequest,
  contactByIdSuccess,
  contactByIdError,
  contactDetailsSet,
  contactDetailsClose,
  messageShow,
  messageClose,
  filter,
  errorReset,
};
