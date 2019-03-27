import { createStore } from "redux";

import { mainReducer } from "./reducers";

const initialStore = {
  value: 0,
  color: "red",
  obj: {
    val: 2
  }
}

export default createStore(mainReducer, initialStore);
