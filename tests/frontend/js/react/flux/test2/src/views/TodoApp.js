import React from "react";

import {Actions} from "../data/TodoActions";

function TodoApp(props) {
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
	Actions.add_todo(value);
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
	Actions.delete_todo(id);
    }

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

export default TodoApp;
