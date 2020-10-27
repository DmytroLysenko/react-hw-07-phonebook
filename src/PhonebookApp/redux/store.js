import { configureStore } from "@reduxjs/toolkit";
import contacts from "./contacts/contactsReducer";

const store = configureStore({
  reducer: {
    contacts,
  },
});

export default store;
