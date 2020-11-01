import axios from "axios";

import * as action from "./contactsActions";

const BASE_URL = "http://localhost:2000/contacts";

const contactsLoad = () => (dispatch) => {
  dispatch(action.contactsLoadRequest());
  axios
    .get(BASE_URL)
    .then(({ data }) => dispatch(action.contactsLoadSuccess(data)))
    .catch((err) => dispatch(action.contactsLoadError(err.message)));
};

const contactAdd = (contact) => (dispatch) => {
  dispatch(action.contactAddRequest());
  axios
    .post(BASE_URL, contact)
    .then(({ data }) => dispatch(action.contactAddSuccess(data)))
    .catch((err) => dispatch(action.contactAddError(err.message)));
};

const contactRemove = (id) => (dispatch) => {
  dispatch(action.contactRemoveRequest());
  axios
    .delete(`${BASE_URL}/${id}`)
    .then(() => dispatch(action.contactRemoveSuccess(id)))
    .catch((err) => dispatch(action.contactRemoveError(err.message)));
};

const contactById = (id) => (dispatch) => {
  dispatch(action.contactByIdRequest());
  axios
    .get(`${BASE_URL}/${id}`)
    .then(({ data }) => dispatch(action.contactByIdSuccess(data)))
    .catch((err) => dispatch(action.contactByIdError(err.message)));
};

export { contactsLoad, contactAdd, contactRemove, contactById };
