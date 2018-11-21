import ActionTypes from "./actions";

function mainReducer(state = 0, action) {
  switch(action.type) {
  case ActionTypes.INCREMENT_NUMBER:
    return state + 1;
  default:
    return state;
  }
}

export mainReducer;
