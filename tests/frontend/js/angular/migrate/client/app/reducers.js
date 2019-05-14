import ActionTypes from "./actions";

function mainReducer(state, action) {
    switch(action.type) {
    case ActionTypes.INCREMENT_NUMBER:
        return Object.assign({}, state, {
            secretValue: state.secretValue + 1
        })
    default:
        return state;
    }
}

export { mainReducer };
