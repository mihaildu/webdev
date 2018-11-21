import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import store from "./store";
import MainComponent from "./components/MainComponent";

ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>,
  document.getElementById("root")
);
