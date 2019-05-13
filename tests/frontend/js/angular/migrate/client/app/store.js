import { createStore } from "redux";

import { mainReducer } from "./reducers";

const initialStore = {
  data: 100,
  secretValue: 10,
}

export default createStore(mainReducer, initialStore);
