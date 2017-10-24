/*
 * React + Flux todo app
 * https://github.com/facebook/flux/tree/master/examples/flux-todomvc
 * */

import Immutable from "immutable";
import React from "react";
import ReactDOM from "react-dom";
import {Dispatcher} from "flux";
import {ReduceStore} from "flux/utils";
import {Container} from "flux/utils";

main();

function main() {
    //test1();
    test2();
}

function test1() {
    /*
     * a simple todo app with react without flux
     * */
    class TodoApp extends React.Component {
	constructor(props) {
	    super(props);

	    this.input_change = this.input_change.bind(this);
	    this.add_todo = this.add_todo.bind(this);
	    this.key_down = this.key_down.bind(this);
	    this.delete_note = this.delete_note.bind(this);

	    /* initial todo list */
	    this.state = {
		todos: {
		    1: {
			id: 1,
			text: "buy toilet paper"
		    }
		}
	    };

	    this.next_id = 2;
	    this.value = "";
	}

	input_change(event) {
	    this.value = event.target.value;
	}

	add_todo(event) {
	    /* nothing to add if string is empty */
	    if (this.value === "")
		return;

	    /* create new todo list */
	    var new_todos = this.state.todos;
	    new_todos[this.next_id] = {
		id: this.next_id++,
		text: this.value
	    };

	    /* update state and render again */
	    this.setState({
		todos: new_todos
	    });

	    /* also clear text in todo input */
	    document.getElementById("input").value = "";
	}

	key_down(event) {
	    /*
	     * since this is not actually a form hitting enter will do nothing
	     * we can add a listener for key down, and if it's enter we can
	     * add todo
	     * */
	    const ENTER_KEY_CODE = 13;
	    if (event.keyCode === ENTER_KEY_CODE) {
		this.add_todo();
	    }
	}

	delete_note(event, id) {
	    /* prevent following link */
	    event.preventDefault();

	    /* delete note with id */
	    var new_todos = this.state.todos;
	    delete new_todos[id];

	    /* update state and render again */
	    this.setState({
		todos: new_todos
	    });
	}

	render() {
	    /* convert state.todos to html list */
	    const todos_lst = Object.values(this.state.todos).map(
		n => (
		    <li key={n.id}>
		      {n.text}
		      <a className="delete-note"
			 href=""
			 onClick={(e) => this.delete_note(e, n.id)}>x</a>
		    </li>
		)
	    );
	    return (
		<div>
		  <h1>Todos</h1>
		  <ul>
		    {todos_lst}
		  </ul>
		  <input id="input" type="text" size="20"
			 placeholder="What's left to do?"
			 name="my_name"
			 onChange={this.input_change}
			 onKeyDown={this.key_down} />
		  <button onClick={this.add_todo}>
		    Add new todo
		  </button>
		</div>
	    );
	}
    }
    ReactDOM.render(
	<TodoApp />,
	document.getElementById("todoapp")
    );
}

function test2() {
    /*
     * same app, this time with flux
     *
     * steps for converting:
     *   create a store for data
     *   move state data to that store (state.todos)
     *   move functions from view to the store as well (the ones
     *     that manipulate data); they will all reside in the same function
     *     that deals with actions received from the dispatcher
     *   create a dispatcher + action types
     *
     *   when something happens (e.g. new note is added), the view
     *   will notify the dispatcher (dispatch an action) which, in turn
     *   will notify all the stores; the store will update the data and
     *   cause the views to re-render
     *
     *   the data from store should be available to the view via props
     *
     *   there is some help from flux package
     *
     * also, if we are going to use the flux package, we must convert the
     * view class to a function
     * */

    /* creating a dispatcher */
    var MyDispatcher = new Dispatcher();

    /* the view component */
    function TodoApp(props) {
	/*
	 * for now leave these functions here
	 * we have the same functions as test1() but now they only dispatch
	 * actions
	 *
	 * check flux/test2 for a better organization of modules
	 * */

	/*
	 * value is the current value of the input element this can be moved
	 * to the store (e.g. maybe some other view components will need it,
	 * and maybe rename it to draft)
	 *
	 * in this case, a new action will be generated every time something
	 * is typed which will notify the store to update it internally
	 *
	 * since this is a simple example, and value is only needed here
	 * internally, we won't do that for now
	 * */
	var value = "";
	const ENTER_KEY_CODE = 13;

	function input_change(event) {
	    value = event.target.value;
	}

	function add_todo(event) {
	    /* nothing to add if string is empty */
	    if (value == "")
		return;

	    /* dispatch action */
	    MyDispatcher.dispatch({
		type: "ADD_TODO",
		text: value
	    });
	}

	function key_down(event) {
	    /* same as add_todo */
	    if (event.keyCode === ENTER_KEY_CODE) {
		add_todo();
	    }
	}

	function delete_note(event, id) {
	    /* stop page from reloading */
	    event.preventDefault();

	    /* dispatch delete action */
	    MyDispatcher.dispatch({
		type: "DELETE_TODO",
		id
	    });
	}

	/*
	 * state is available from the store via props
	 * props.todos = Immutable.OrderedMap({...}) with all the todos
	 * */

	/* convert state.todos to html list */
	var todos_lst = [...props.todos.values()].map(
	    n => (
		<li key={n.id}>
		  {n.text}
		  <a className="delete-note"
		     href=""
		     onClick={(e) => delete_note(e, n.id)}>x</a>
		</li>
	    )
	);
	return (
	    <div>
	      <h1>Todos</h1>
	      <ul>
		{todos_lst}
	      </ul>
	      <input id="input" type="text" size="20"
		     placeholder="What's left to do?"
		     name="my_name"
		     onChange={input_change}
		     onKeyDown={key_down} />
	      <button onClick={add_todo}>
		Add new todo
	      </button>
	    </div>
	);
    }

    /* the store */
    class TodoStore extends ReduceStore {
	constructor() {
	    super(MyDispatcher);
	    /*
	     * we do not contruct this.state here
	     * instead, we use a function
	     * */
	}
	getInitialState() {
	    /*
	     * this is similar to this.state from our prev example on construction
	     * the state of this store (and possible others) will be merged for the
	     * view, so we don't need to use a name
	     *
	     * for some reason (TODO find out why) using a normal javascript object
	     * doesn't work, even if I return a new one, the views won't be rendered
	     * again
	     *
	     * Immutable.OrderedMap() acts like a javascript object {} and it also
	     * ensures same order on data
	     *
	     * also, using something like OrderedMap({1: {...}}) will convert 1 to
	     * string, while set(1, ...) will use a number for 1
	     * */
	    this.next_id = 2;
	    return Immutable.OrderedMap().set(1, {
		id: 1,
		text: "buy toilet paper"
	    });
	}
	reduce(state, action) {
	    /*
	     * this gets called on every action by dispatcher
	     * action = the object we passed to dispatch()
	     * state = the internal state (this.state)
	     *
	     * we need to return a new state
	     * if it's the same I'm not sure views get rendered again
	     * */
	    switch(action.type) {
	    case "ADD_TODO":
		/*
		 * clear value
		 * this could be done via a new action
		 * */
		document.getElementById("input").value = "";

		/* change state - state.set will return a new object */
		const id = this.next_id++;
		return state.set(id, {id, text: action.text});

	    case "DELETE_TODO":
		return state.delete(action.id);

	    default:
		return state;
	    }
	}
    }

    /* also, instantiate */
    var MyTodoStore = new TodoStore();

    /* connect the store to the view */
    function getStores() {
	return [MyTodoStore];
    }
    function getState() {
	/*
	 * I assume this is the state for the view (this.state) and it can be
	 * a combination of the states from the stores
	 *
	 * instead of using this.state, everything returned can be accessed
	 * via props
	 *
	 * the state from MyTodoStore will be accessible via props.todos
	 * */
	return {
	    todos: MyTodoStore.getState()
	};
    }

    /*
     * here the connection happens
     * MyContainer is the TodoApp view connected to MyTodoStore
     * */
    var TodoAppContainer = Container.createFunctional(TodoApp,
						      getStores, getState);

    ReactDOM.render(
	<TodoAppContainer />,
	document.getElementById("todoapp")
    );
}
