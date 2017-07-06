// we need to register the controller
// controller comes from MVC (model-view-controller)
// apparently now angular.js is MVW (whatever)
angular.module("todo_app", []).controller("todo_ctrl", todo_ctrl_func);

// you can also add routes with views + controllers (similar to django)

/*
angular.module("todo_app", [])
  .controller("todo_ctrl", function() {
    var todoList = this;
  });
*/

// this is not visible with {{outside_variable}}
// or I don't know how to use it
var outside_variable = 11;

// controller function
function todo_ctrl_func(){
    // this is run after registration?
    // this is like the scope of "todo_ctrl"
    // everything we store here is accesssible inside "todo_ctrl"
    this.secret_number = 10;

    this.fac = function(n){
	if (n < 2){
	    return 1;
	}
	var p = 1;
	for (var i = 2; i <= n; i++)
	    p = p * i;
	return p;
    };

    this.todo_list = [
	{text: "Keep calm", done: true},
	{text: "Carry on", done: false},
    ]

    this.remaining = function(){
	var cnt = 0;
	// angular for loop
	angular.forEach(this.todo_list, function(todo){
	    cnt = cnt + (todo.done ? 0 : 1);
	    /*
	    if (todo.done == false) {
		cnt = cnt + 1;
	    }
	    */
	});
	return cnt;

	// old for loops
	/*
	for (var i in this.todo_list) {
	    if (this.todo_list[i].done == false) {
		cnt = cnt + 1;
	    }
	}
	*/
	/*
	for (var i = 0; i < this.todo_list.length; i++) {
	    if (this.todo_list[i].done == false) {
		cnt = cnt + 1;
	    }
	}
	*/
    }

    this.archive = function(){
	var new_list = [];
	for (var i in this.todo_list) {
	    if (this.todo_list[i].done == false) {
		new_list.push(this.todo_list[i]);
	    }
	}
	// js has garbage collector
	this.todo_list = new_list;
    }

    this.add = function(){
	if (typeof(this.new_todo) == "undefined") {
	    return;
	}
	this.todo_list.push({text: this.new_todo, done: false});

	// this will make the input text/bar empty again
	this.new_todo = "";
    }
}

function test(){
    alert("lkdja");
}
