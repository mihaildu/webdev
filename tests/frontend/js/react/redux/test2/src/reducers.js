import ActionTypes from "./actions";
import * as _ from "lodash";

function mainReducer(state, action) {
  //const newState = _.cloneDeep(state);
  const newState = _.clone(state);
  switch(action.type) {
  case ActionTypes.INCREMENT_NUMBER:
    newState.value++;
    return newState;
  case ActionTypes.CHANGE_COLOR:
    if (newState.color == "red") {
      newState.color = "blue";
    } else {
      newState.color = "red";
    }
    return newState;
  default:
    return state;
  }
}

export { mainReducer };
