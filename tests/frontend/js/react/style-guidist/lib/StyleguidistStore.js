import { ReduceStore } from "flux/utils"
import Immutable from "immutable"

import StyleguidistDispatcher from "./StyleguidistDispatcher"
import { ActionTypes } from "./StyleguidistActions"

class StyleguidistStore extends ReduceStore {
  constructor() {
    super(StyleguidistDispatcher)
  }
  getInitialState() {
    return Immutable.OrderedMap({
      theme: "defaultTheme"
    });
  }
  reduce(state, action) {
    switch(action.type) {
    case ActionTypes.UPDATE_THEME:
      console.log("update theme: ", action.theme);
    default:
      return state;
    }
  }
}

export default new StyleguidistStore();
