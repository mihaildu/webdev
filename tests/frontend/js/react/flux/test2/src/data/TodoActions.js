import MyDispatcher from "./MyDispatcher";

/* TODO try only ADD_TODO */
const ActionTypes = {
    ADD_TODO: "ADD_TODO",
    DELETE_TODO: "DELETE_TODO"
};

const Actions = {
    add_todo(text) {
	MyDispatcher.dispatch({
	    type: ActionTypes.ADD_TODO,
	    text
	});
    },
    delete_todo(id) {
	MyDispatcher.dispatch({
	    type: ActionTypes.DELETE_TODO,
	    id
	});
    }
};

export {ActionTypes, Actions};
