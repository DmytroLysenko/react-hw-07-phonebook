import { configureStore } from "@reduxjs/toolkit";
import contacts from "./contacts/contactsReducers";

const store = configureStore({
  reducer: {
    contacts,
  },
});

export default store;
