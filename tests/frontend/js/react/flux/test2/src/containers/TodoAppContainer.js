import {Container} from "flux/utils";

import TodoApp from "../views/TodoApp";
import MyTodoStore from "../data/MyTodoStore";

/* connect the store to the view */
function getStores() {
    return [MyTodoStore];
}
function getState() {
    return {
	todos: MyTodoStore.getState()
    };
}

export default Container.createFunctional(TodoApp, getStores, getState);
