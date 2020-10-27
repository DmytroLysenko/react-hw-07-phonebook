import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./PhonebookApp/redux/store";
import "./index.css";

import PhonebookApp from "./PhonebookApp/PhonebookApp";

ReactDOM.render(
  <Provider store={store}>
    <PhonebookApp />
  </Provider>,

  document.getElementById("root")
);
