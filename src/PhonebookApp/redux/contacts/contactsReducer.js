import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./contactsActions";

const items = createReducer([], (builder) => {
  builder
    .addCase(actions.contactsLoad, (state, action) => action.payload)
    .addCase(actions.contactAdd, (state, action) => [...state, action.payload])
    .addCase(actions.contactRemove, (state, action) =>
      state.filter((item) => item.id !== action.payload)
    );
});

const message = createReducer(null, {
  [actions.messageSet]: (state, action) => action.payload,
  [actions.messageClose]: () => null,
});

const filter = createReducer("", {
  [actions.filter]: (state, action) => action.payload,
});

const itemDetails = createReducer(null, {
  [actions.contactDetailsSet]: (state, action) => action.payload,
  [actions.contactDetailsClose]: () => null,
});

export default combineReducers({
  items,
  message,
  filter,
  itemDetails,
});
