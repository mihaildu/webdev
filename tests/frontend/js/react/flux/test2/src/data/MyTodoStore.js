import {ReduceStore} from "flux/utils";
import Immutable from "immutable";

import MyDispatcher from "./MyDispatcher";
import {ActionTypes} from "./TodoActions";

class TodoStore extends ReduceStore {
    constructor() {
	super(MyDispatcher);
    }
    getInitialState() {
	this.next_id = 2;
	return Immutable.OrderedMap().set(1, {
	    id: 1,
	    text: "buy toilet paper"
	});
    }
    reduce(state, action) {
	switch(action.type) {

	case ActionTypes.ADD_TODO:
	    document.getElementById("input").value = "";
	    /* change state - state.set will return a new object */
	    const id = this.next_id++;
	    return state.set(id, {id, text: action.text});

	case ActionTypes.DELETE_TODO:
	    return state.delete(action.id);

	default:
	    return state;
	}
    }
}

export default new TodoStore();
