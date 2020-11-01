import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import * as actions from "./contactsActions";

const items = createReducer([], (builder) => {
  builder
    .addCase(actions.contactsLoadSuccess, (state, action) => action.payload)
    .addCase(actions.contactAddSuccess, (state, action) => [
      ...state,
      action.payload,
    ])
    .addCase(actions.contactRemoveSuccess, (state, action) =>
      state.filter((item) => item.id !== action.payload)
    );
});

const message = createReducer(null, {
  [actions.messageShow]: (state, action) => action.payload,
  [actions.messageClose]: () => null,
});

const filter = createReducer("", {
  [actions.filter]: (state, action) => action.payload,
});

const itemDetails = createReducer(null, {
  [actions.contactDetailsSet]: (state, action) => action.payload,
  [actions.contactDetailsClose]: () => null,
});

const isLoading = createReducer(false, {
  [actions.contactsLoadRequest]: () => true,
  [actions.contactsLoadSuccess]: () => false,
  [actions.contactsLoadError]: () => false,
});

const error = createReducer(false, {
  [actions.contactsLoadError]: (state, action) => action.payload,
  [actions.contactAddError]: (state, action) => action.payload,
  [actions.contactRemoveError]: (state, action) => action.payload,
  [actions.errorReset]: () => false,
});

export default combineReducers({
  items,
  message,
  filter,
  itemDetails,
  isLoading,
  error,
});
