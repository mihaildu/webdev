import { createStore } from "redux";
import createConnect from 'redux-connect-standalone';

import { mainReducer } from "./reducers";

const initialStore = {
  data: 100,
  secretValue: 10,
}

const store = createStore(mainReducer, initialStore);
export default store;

export const connect = createConnect(store);
