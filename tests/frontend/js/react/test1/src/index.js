/*
 * React tests
 *
 * Official react docs:
 * https://reactjs.org/docs/hello-world.html
 *
 * Official react tutorial:
 * https://reactjs.org/tutorial/tutorial.html
 *
 * Some of these examples are also taken from random video courses
 * https://www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b
 * https://www.youtube.com/watch?v=JPT3bFIwJYA&list=PL55RiY5tL51oyA8euSROLjMFZbXaV7skS
 *
 * To check the results go to
 * http://127.0.0.1/tests/frontend/js/react/test1/dist/index.html
 * assuming apache is running
 * */

import React from "react";
import ReactDOM from "react-dom";

/*
 * you can also import CSS files
 * TODO figure out why this doesn't work
 * */
//import css from "./index.css";

import MyComp2 from "./components/mycomp2";

main();

function main(){
    //test1();
    test2_docs();
}

function test1(){
    /*
     * One way to use react is to create divs on the html page
     * in this case dist/index.html, and then select them with
     * react and update the stuff inside
     *
     * You use ReactDOM.render(HTML stuff, element id)
     * The HTML stuff is in JSX
     * */

    /*
     * this will select element with id "react-elem1" and will
     * add "<h1>Hello, world!</h1>" to its inner html
     * */
    ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById("react-elem1")
    );

    /*
     * you can also use classes for the html part
     * ReactDOM.render(<ClassName/>, element)
     * */
    class Layout extends React.Component {
	render(){
	    /* this is JSX as well */
	    return (
		<p>This is a paragraph</p>
	    );
	}
    }
    const elem2 = document.getElementById("react-elem2");
    ReactDOM.render(<Layout/>, elem2);

    /*
     * you can't return more than one html element
     * e.g. return(<div></div><div></div>) won't work
     * so if you want to do that, you have to wrap everything up by
     * same html element (e.g. wrap everything in a <div>)
     * */

    /*
     * you can also run javascript in jsx using {}
     * similar to a template engine
     * */
    class MyComp1 extends React.Component {
	constructor() {
	    // you must call super()
	    // this is ES6
	    super();
	    this.name = "tom";
	}

	print_something() {
	    return "You can also call functions in JSX";
	}

	render() {
	    const name = "tim";
	    return (
		<div>
		  <p>Hello, my name is {name}</p>
		  <p>1 + 5 = {1 + 5}</p>
		  <p>{this.print_something()}</p>
		  <p>Hello, my name is {this.name}</p>
		</div>
	    );
	}
    }
    const elem3 = document.getElementById("react-elem3");
    ReactDOM.render(<MyComp1/>, elem3);

    /* this is an imported component */
    const elem4 = document.getElementById("react-elem4");
    ReactDOM.render(<MyComp2/>, elem4);

    // TODO you can use components inside other components
}

function test2_docs(){
    /*
     * these examples were taken from react docs
     * https://reactjs.org/docs/hello-world.html
     * */

    /* quick start guide */
    //test2_quick_start();

    /* advanced guides */
    // TODO

    /* tutorial */
    test2_tutorial();
}

function test2_quick_start(){
    //test2_hello_world();
    //test2_introducing_jsx();
    //test2_rendering_elements();
    //test2_components_props();
    //test2_state_lifecycle();
    //test2_handling_events();
    //test2_conditional_rendering();
    //test2_lists_keys();
    //test2_forms();
    //test2_lifting_state_up();
    //test2_composition_inheritance();
}

function test2_hello_world(){
    /*
     * hello world
     *
     * main workflow with react - create divs in the html file
     * use ReactDOM.render() to update them with content
     *
     * first argument is some html code (in jsx)
     * second argument is a html element
     *
     * the html code/jsx stuff is called a react element
     * you also have react components (multiple elements)
     * */
    ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById("root")
    );
}

function test2_introducing_jsx(){
    /*
     * introducing jsx
     *
     * so you can use jsx anywhere in the code
     * the jsx code will be converted to a React element object
     * */
    const elem1 = <p>Hello from test2</p>;

    /* you can also run javascript code in jsx with {} */
    function format_name(user) {
	return user.first_name + " " + user.last_name;
    }
    const tim = {
	first_name: "tim",
	last_name: "timmy"
    };

    /*
     * the () is not needed, but used to avoid ASI
     * automatic semicolon insertion (some ; might be inserted by the browser)
     * TODO read this
     * http://stackoverflow.com/q/2846283
     * */
    const elem2 = (
	<p>Hello, {format_name(tim)}</p>
    );

    /* you can also replace the html part with a var */
    ReactDOM.render(
	elem2,
	document.getElementById("root")
    );

    /*
     * these reacts elements also take attributes
     * tabindex is a html prop (when you press tab and it moves to the next link)
     * jsx uses camel case (tabIndex)
     * */
    const elem3 = <div tabIndex="0"></div>;

    /* you can also use {} on props */
    const url = "https://www.google.ro";
    const elem4 = <img src={url}></img>;

    /* you can write only one part of the tag since inner is empty */
    const elem5 = <img src={url} />;

    /* you can wrap multiple tags inside another one in jsx (children) */
    const elem6 = (
	<div>
	  <p>Hello from elem6, first paragraph!</p>
	  <p>Hello from elem6, second paragraph!</p>
	</div>
    );
    ReactDOM.render(
	elem6,
	document.getElementById("root2")
    );

    /* apparently jsx automatically escapes text when you output it */
    const name = "tommy<br>";
    const elem7 = <p>Hello, my name is {name}</p>;
    ReactDOM.render(
	elem7,
	document.getElementById("root3")
    );

    /*
     * React elements (the ones created from jsx html code) can also be
     * created with React.createElement()
     * */
    const elem8 = React.createElement(
	"p",                 /* element type */
	{className: "my-p"}, /* props */
	"Hello from elem8"   /* inner html */
    );
    ReactDOM.render(
	elem8,
	document.getElementById("root4")
    );

    /*
     * simplified structure of a react element
     * where is this.state?
     * */
    const elem9 = {
	type: "p",
	props: {
	    className: "my-p",
	    children: "Hello from elem9"
	}
    };
}

function test2_rendering_elements(){
    /*
     * rendering elements
     *
     * updating rendered elements
     *
     * so elements are immutable, so if you want to update one from
     * a component, you have to create a new one and re-render everything
     * with reactdom.render()
     *
     * this will show and update the time
     * also, this is not the way to do it, this is a bad example
     * render() should be called once, and state should be used
     * to update elements
     * */
    function tick(){
	/* you can use jsx like this as well */
	const element = (
	    <div>
	      <p>The date is {new Date().toLocaleTimeString()}</p>
	    </div>
	);
	ReactDOM.render(
	    element,
	    document.getElementById("root")
	);
    }
    setInterval(tick, 1000);
}

function test2_components_props(){
    /*
     * components and props
     *
     * this is a react component
     * it returns a react element
     *
     * as a side note, props is read-only
     * */
    function welcome(props) {
	return <p>Hello {props.name}</p>;
    }
    const elem10 = welcome({name: "tim"});
    ReactDOM.render(
	elem10,
	document.getElementById("root")
    );

    /* you can also use classes from ES6 to define components */
    class Welcome extends React.Component {
	render() {
	    return <p>Hello {this.props.name}</p>;
	}
    }

    /* one example on how to use it (with jsx) */
    const elem11 = <Welcome name="Sara" />;
    ReactDOM.render(
	elem11,
	document.getElementById("root2")
    );

    /*
     * composing components
     * we can use components inside other components
     * */
    class App extends React.Component {
	render() {
	    /* components must return a single elem (e.g. div) */
	    return (
		<div>
		  <Welcome name="John" />
		  <Welcome name="Jim" />
		  <Welcome name="Jason" />
		</div>
	    );
	}
    }
    const elem12 = <App />;
    ReactDOM.render(
	elem12,
	document.getElementById("root3")
    );
}

function test2_state_lifecycle(){
    /*
     * state and lifecycle
     *
     * changing the clock from the prev
     * example to update time using state
     *
     * so a react component has this thing called state
     * you can access it via this.state
     *
     * every time the state changes, the component is rendered again
     * so we just need to change the state every second with a new time
     *
     * the state is a js object and can have anything
     * e.g. this.state = {name: "tim", time: new Date()}
     *
     * to trigger a re-render you must use setState() to change it
     * */

    /* first, make a component for it */
    class Clock extends React.Component {
	/* add a ctor */
	constructor(props) {
	    /* first call ctor for React.Component */
	    super(props);
	    /* save time in state var */
	    this.state = {time: new Date()};
	}

	/*
	 * mount function
	 *
	 * this is different than ctor
	 * this is called when the component is rendered
	 * ctor is called when the component is created
	 *
	 * this and unmount are called "lifecycle hooks"
	 * also, the method must have this ... name (componentDidMount)
	 *
	 * I guess there is some philosophy about what to set in
	 * ctor and what to set in the mounting function
	 *
	 * why not free memory and delete stuff on unmounting
	 * and create them back on mounting?
	 * */
	componentDidMount() {
	    /*
	     * we can set interval here
	     * 
	     * my explanation of why we use () => this.tick() and not
	     * tick() directly
	     *
	     * if you call a function with a name, this will be a local
	     * variable and it will point to the obj that called the function
	     * so in the case of setInterval(tick, ...) it will be window
	     * so in tick() we will have window.setState() which is not good
	     *
	     * in an anonymous function there is no local "this", so if we
	     * use this.tick(), then "this" will be taken from the outer scope
	     * if there is one; in our case, "this" points to Clock, which
	     * is exactly what we want
	     *
	     * more in refs.js/test36
	     * */
	    this.timer = setInterval(
		() => this.tick(),
		1000
	    );
	}

	/* this should update the date/time */
	tick() {
	    this.setState({
		time: new Date()
	    });
	}

	/*
	 * this is called when component is removed from the DOM
	 * */
	componentWillUnmount() {
	    /* here we remove the interval fcn */
	    clearInterval(this.timer);
	}

	/* now get date from this.state */
	render() {
	    return (
		<div>
		  <p>Time is {this.state.time.toLocaleTimeString()}</p>
		</div>
	    );
	}
    }
    ReactDOM.render(
	<Clock />,
	document.getElementById("root")
    );

    /* another state example */
    class Comp1 extends React.Component {
	/* set initial state in ctor */
	constructor(props) {
	    /*
	     * props come from reactdom.render()
	     * they are read-only and you can't change them anymore
	     *
	     * however, you can you can save as many vars as you want in this
	     */
	    super(props);
	    this.state = {name: "Tim", age: 20};
	    this.secret = 42;
	}
	componentDidMount() {
	    /* after 2s we change name */
	    setTimeout(
		/*
		 * you only mention the state props that changed
		 * the new state is actually merged into the old one
		 * so you can use new props as well
		 * */
		() => this.setState({name: "Tom"}),
		2000
	    );
	    this.change_age();
	}
	change_age() {
	    /*
	     * let's say you want to change state based on props
	     * you can't use
	     * this.setState({smth: this.state.smth + this.props.inc});
	     * you need to do it like this
	     * */
	    this.setState((prev_state, props) => ({
		age: prev_state.age + Number(props.inc)
	    }));
	}
	render() {
	    return (
		<div>
		  Hello, my name is {this.state.name} and my age
		  is {this.state.age}
		</div>
	    );
	}
    }

    /* props can only be set here, they can't be changed after this */
    ReactDOM.render(
	<Comp1 inc="10" />,
	document.getElementById("root2")
    );
}

function test2_handling_events(){
    /* having a button with react */
    ReactDOM.render(
	<button>Click me</button>,
	document.getElementById("root")
    );

    /*
     * if you want to specify onclick prop in jsx
     * you need to use camel case, so it becomes onClick
     * */
    function alert_lasers() {
	alert("Lasers activated!");
    }

    ReactDOM.render(
	<button onClick={alert_lasers}>Click me with link</button>,
	document.getElementById("root")
    );

    /* links with react */
    function handle_click(e) {
	/* to prevent default action - similar to return false; in html */
	e.preventDefault();
	/* e = SyntheticEvent */
	console.log("The link was clicked");
    }
    ReactDOM.render(
	<a href="#" onClick={handle_click}>
	  Click me
	</a>,
	document.getElementById("root")
    );

    /* a proper button component in react that shows on/off */
    class MyButton extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {on: true};

	    /*
	     * handle_click() will have this = "undefined" for some reason
	     * so we need to hardcode this to MyButton
	     *
	     * apparently class methods are not bound by default
	     * so we only have "this" in the ctor
	     *
	     * I guess react makes sure render() is called from MyButton
	     * so we can use "this" there as well
	     * */
	    this.handle_click = this.handle_click.bind(this);
	}

	handle_click() {
	    this.setState(
		prev_state => ({
		    on: !prev_state.on
		})
	    );
	}

	render(){
	    return (
		<button onClick={this.handle_click}>
		  {this.state.on ? "On" : "Off"}
		</button>
	    );
	}
    }
    ReactDOM.render(
	<MyButton />,
	document.getElementById("root")
    );

    /*
     * to bind this in class functions you can also use anon functions
     * the onclick method takes one argument (the event)
     * */
    class MyComp1 extends React.Component {
	fcn(e) {
	    /* we didn't bind "this" in ctor */
	    console.log(this);
	}
	render() {
	    return (
		/* "this" will always be the one from render() scope */
		<button onClick={(e) => this.fcn(e)}>
		  Click me
		</button>
	    );
	}
    }
    ReactDOM.render(
	<MyComp1 />,
	document.getElementById("root")
    );

    /* like this you can also pass args to the function */
    class MyComp2 extends React.Component {
	fcn(e, row_id) {
	    console.log(row_id);
	}
	render() {
	    const id = 10;
	    return (
		<button onClick={(e) => this.fcn(e, id)}>
		  Click me
		</button>
	    );
	}
    }
    ReactDOM.render(
	<MyComp2 />,
	document.getElementById("root")
    );
}

function test2_conditional_rendering() {
    /* for stuff like logged in users etc */

    /*
     * we can make 2 components to display
     * one for users and other one for guests
     * */
    class UserGreeting extends React.Component {
	render() {
	    return <p>Welcome back!</p>;
	}
    }
    class GuestGreeting extends React.Component {
	render() {
	    return <p>We don't talk to you until you sign in</p>;
	}
    }

    /*
     * one top greeting component
     * honestly, I would have just used one component to begin with
     * */
    class TopGreeting extends React.Component {
	render() {
	    if (this.props.logged_in)
		return <UserGreeting />;
	    return <GuestGreeting />;
	}
    }

    ReactDOM.render(
	/*
	 * side note: you can also pass numbers like this (using {})
	 * and not convert them later on from string (like I did previously)
	 * */
	<TopGreeting logged_in={true} />,
	document.getElementById("root")
    );

    /* or just one greeting to begin with */
    class Greeting extends React.Component {
	render() {
	    if (this.props.logged_in)
		return <p>Welcome back!</p>;
	    return <p>Go away!</p>;
	}
    }
    ReactDOM.render(
	<Greeting logged_in={false} />,
	document.getElementById("root")
    );

    /* creating a simple Login/Logout system */
    class LoginControl extends React.Component {
	constructor(props) {
	    super(props);
	    /*
	     * since we want to render again everything when we log in/out
	     * we add the control var to the state
	     * */
	    this.state = {logged_in: false};

	    /* make this always point to LoginControl in login/logout */
	    this.login = this.login.bind(this);
	    this.logout = this.logout.bind(this);
	}

	login() {
	    this.setState({logged_in: true});
	}

	logout() {
	    this.setState({logged_in: false});
	}

	render() {
	    /* to prevent a component from showing just return null */
	    let button = null;
	    if (this.state.logged_in)
		button = <button onClick={this.logout}>Log Out</button>;
	    else
		button = <button onClick={this.login}>Log In</button>;

	    return (
		<div>
		  <Greeting logged_in={this.state.logged_in}/>
		  {button}
		</div>
	    );
	}
    }
    ReactDOM.render(
	<LoginControl />,
	document.getElementById("root")
    );
}

function test2_lists_keys() {
    /*
     * making a list with map
     * I guess this only works with jsx
     * also, you have to add the prop key which should be unique
     * the key is a string, but I guess type coercion occurs here
     *
     * I guess keys are used to differentiate between children with same elem
     * this helps react update the dom faster
     * you can use ids from dbs as keys
     * */
    const numbers = [1, 2, 3, 4, 5];
    const lst = numbers.map(n => <li key={n}>{n}</li>);
    ReactDOM.render(
	<ul>
	  {lst}
	</ul>,
	document.getElementById("root")
    );

    /* this is the equivalent of doing (lists don't work in jsx apparently) */
    ReactDOM.render(
	<ul>
	  {[<li key="1">milk</li>,
	    <li key="2">chips</li>,
	    <li key="3">honey</li>]}
	</ul>,
	document.getElementById("root")
    );

    /*
     * map can also give the index to the callback, so you can use
     * that as a key
     * in the next example we will have from 0 to 4
     * */
    const lst2 = numbers.map((n, index) => <li key={index}>{n}</li>);
    ReactDOM.render(
	<ul>
	  {lst2}
	</ul>,
	document.getElementById("root")
    );

    /*
     * if you have a react component that has <li> inside (for example
     * ListItem) and then you use it in another component inside a list
     * then the key should be added to the elements in the list like
     * <ListItem key={n}...> and not to <li> inside the first component
     * */

    /* keys only need to be locally unique and not globally */

    /* keys can't be accessed from props inside component */
    class MyComp1 extends React.Component {
	constructor(props) {
	    super(props);
	    // this will give a warning + undefined
	    console.log(props.key);
	}
	render(){
	    return <p>Hello</p>;
	}
    }
    const lst3 = [<MyComp1 key="1" />, <MyComp1 key="2" />];
    ReactDOM.render(
	<div>
	  {lst3}
	</div>,
	document.getElementById("root")
    );
}

function test2_forms() {
    /* controlled components */

    /* a form with react */
    class MyForm extends React.Component {
	constructor(props) {
	    super(props);
	    this.handle_submit = this.handle_submit.bind(this);
	    this.handle_change = this.handle_change.bind(this);
	    /*
	     * initial value (if submit is clicked
	     * without typing something)
	     * */
	    //this.state = {value: ""};
	    this.value = "";
	}

	handle_change(event) {
	    /*
	     * value is in event.target.value
	     *
	     * you can use same handler for multiple inputs
	     * and use name prop to differentiate between them
	     * it will be stored in event.target.name
	     * */
	    //this.setState({value: event.target.value});
	    this.value = event.target.value;
	}

	handle_submit(event) {
	    event.preventDefault();
	    /*
	     * you can get the value the old fashioned way
	     * document.getElementById("name").value
	     *
	     * but you can also do it react way:
	     * store value in this.state.value every time it changes
	     * then get it from there
	     *
	     * this will make react get the value from the input and
	     * display the same value again upon rendering (controlled
	     * component)
	     *
	     * you can also just store the value in an internal variable
	     *
	     * the first method might help you check the user input or
	     * modify it as it gets typed (e.g. to uppercase)
	     * */
	    //console.log(this.state.value);
	    console.log(this.value);
	}
	render(){
	    return (
		<form onSubmit={this.handle_submit}>
		  <input id="name" type="text" placeholder="Name"
			 onChange={this.handle_change} />
		  <input type="submit" value="Submit" />
		</form>
	    );
	}
    }
    ReactDOM.render(
	<MyForm />,
	document.getElementById("root")
    );

    /*
     * some differences in react vs normal html
     *
     * textarea
     * if you want to get the value from a textarea, you usually need
     * the inner html; in react you can use value as well
     *
     * select
     * to get what element is selected check the value prop from <select>
     * normally the inner <option> has selected inside (<option selected...)
     * you can also use an array of options for value inside select
     * instead of using <option> for each
     *
     * TODO test this at some point
     * */

    /* TODO move this to ES6 */
    /* in ES6 you can use [] notation when initializing objects */
    const mprop = "name";
    let mobj = {
	/* this is mobj["mprop"], not mobj["name"] */
	mprop: "mobj"
    };
    console.log(JSON.stringify(mobj));

    /* one way to achieve before ES6 is to assign it after init */
    mobj[mprop] = "mobj";
    console.log(JSON.stringify(mobj));

    /* in ES6 you can do it at init too */
    const mobj2 = {
	[mprop]: "mobj2"
    };
    console.log(JSON.stringify(mobj2));

    /*
     * if you set a value to input field without onChange method
     * it will be read-only
     * it will also give a warning
     *
     * the proper way to lock it/make it read-only is to add readOnly to it
     * */
    ReactDOM.render(
	<input value="hi" readOnly />,
	document.getElementById("root")
    );
}

function test2_lifting_state_up() {
    /*
     * we want to have 2 temperature input fields and one output text
     * one temp is in celsius
     * the other one in f
     *
     * when we enter a value in one of the input field we want
     * the value to be updated in the other one as well
     * and if the temp (in celsius) >= 100 => output something
     * to re-render stuff we should use state to store the value
     * to have all 3 components updated at the same time we could use
     * only one component, but instead we will "lift the state up"
     *
     * it's not really a react feature, just one way to achieve this
     * when we enter a new value in an input field we will call a
     * function from the parent component (the one that draws both
     * input fields and the output text); this function will be passed
     * via props
     *
     * in this function, we will change state which will force a re-render
     * to have the temp displayed in both input fields, we need to pass
     * this via props as well (also, to the output field)
     * */
    class Verdict extends React.Component {
	render() {
	    /* this.props.temp is always passed in celsius */
	    if (typeof(this.props.temp) == "undefined")
		return <div>Temperature not set</div>;

	    /* this can't happen anymore but heh */
	    if (isNaN(this.props.temp))
		return <div>Bad value for temp</div>;

	    if (this.props.temp >= 100)
		return <div>Water is boiling at this temp</div>;
	    return <div>Water is not boiling yet</div>;
	}
    }

    class Temp extends React.Component {
	/* this is a class for temperature input */

	constructor(props) {
	    super(props);
	    /*
	     * unwrap props only in one place
	     *
	     * props.temp_changed = callback
	     *   (value, scale) / (string, string)
	     * props.scale = "c"/"f"
	     * props.temp = new temp
	     * */

	    /* no need for temp now, we will get a new one for every render() */
	    this.temp_changed = this.props.temp_changed;
	    this.scale = this.props.scale;

	    /* bind stuff */
	    this.handle_change = this.handle_change.bind(this);
	}

	handle_change(event) {
	    this.temp_changed(event.target.value, this.scale);
	}

	render() {
	    /* message helpers */
	    const scale_names = {
		c: "Celsius",
		f: "Fahrenheit"
	    };
	    const temp_name = scale_names[this.scale];
	    /*
	     * apparently, if this.temp is undefined, placeholder will be displayed
	     * same goes for ""
	     * there's a warning for undefined TODO
	     * */
	    return (
		<div>
		  <input onChange={this.handle_change}
			 size="25"
			 placeholder={"Enter temperature in " + temp_name}
			 value={this.props.temp}
			 />
		</div>
	    );
	}
    }

    /* the top element */
    class Calculator extends React.Component {
	constructor(props) {
	    super(props);
	    this.temp_changed = this.temp_changed.bind(this);
	    this.convert_temp = this.convert_temp.bind(this);
	    /*
	     * state:
	     *   c: temperature in C / string or undefined
	     *   f: temperature in F / string or undefined
	     * */
	    this.state = {c: "", f: ""};
	}

	convert_temp(value, from, to) {
	    /*
	     * value = number
	     * from/to = string (c/f)
	     *
	     * TODO some sanity checks here
	     */
	    if (from == to)
		return value;
	    if (from == "c")
		return (value * 9 / 5) + 32;
	    return (value - 32) * 5 / 9;
	}

	temp_changed(value, scale) {
	    /*
	     * there is a small problem with this function
	     * if input ends in "." it will be stripped by number parsing
	     * so that needs to be taken into account as well
	     * */
	    let other_scale;
	    if (scale == "c")
		other_scale = "f";
	    else
		other_scale = "c";

	    let scale_temp, other_temp;
	    if (value == "") {
		scale_temp = "";
		other_temp = "";
	    } else {
		const nvalue = Number(value);
		if (isNaN(nvalue)){
		    scale_temp = "";
		    other_temp = this.state[other_scale];
		} else {
		    scale_temp = String(nvalue);
		    other_temp = String(this.convert_temp(nvalue, scale, other_scale));
		}
	    }
	    this.setState({
		[scale]: scale_temp,
		[other_scale]: other_temp
	    });
	}

	render() {
	    return (
		<div>
		  <Temp scale="c" temp={this.state.c}
			temp_changed={this.temp_changed}/>
		  <Temp scale="f" temp={this.state.f}
			temp_changed={this.temp_changed}/>
		  <Verdict temp={this.state.c}/>
		</div>
	    );
	}
    }
    ReactDOM.render(
	<Calculator />,
	document.getElementById("root")
    );
}

function test2_composition_inheritance() {
    /*
     * composition vs inheritance
     *
     * so instead of inheritance you should use react's composition model
     * */

    /*
     * containmnet
     *
     * you can make react components with start + end tag
     * you need to place {props.children} at some point for this
     * */
    class MyBorder extends React.Component {
	render() {
	    return (
		<div className="my-border">
		  {this.props.children}
		</div>
	    );
	}
    }
    ReactDOM.render(
	<MyBorder>
	  <p>This text is inside MyBorder!</p>
	</MyBorder>,
	document.getElementById("root")
    );

    /*
     * you can also pass components as props
     * and render them where you want
     */

    /*
     * specialization
     *
     * this is when you have a component with some generic props
     * and you create another component that use the first one
     * with more specialized prop values
     * */
}

function test2_tutorial() {
    /*
     * building a tic-tac-toe game
     * didn't bother to implement history, nothing to learn from that
     * */

    /* square class */
    class Square extends React.Component {
	constructor(props) {
	    super(props);
	    /*
	     * props:
	     *   player     = string; X or 0
	     *   index      = number; [0 - 8]
	     *   callback   = notify above layer to update things
	     *   game_ended = true/false
	     * */

	    /* symbol for current square */
	    this.symbol = "";
	    this.fill_square = this.fill_square.bind(this);
	}

	fill_square() {
	    /*
	     * function that marks a square
	     *
	     * if the game ended it does nothing
	     *   this can be moved in the render() function
	     *   doing this will save the overhead of calling a function
	     *   and checking a condition
	     *
	     * if the square is already marked it does nothing
	     *
	     * otherwise just save symbol and notify up
	     * */

	    /* game is over */
	    if (this.props.game_ended === true)
		return;

	    /* square already marked */
	    if (this.symbol != "")
		return;

	    /* save symbol */
	    this.symbol = this.props.player;

	    /* notify up */
	    this.props.callback(this.props.index);
	}

	render() {
	    return (
		<button className="square" onClick={this.fill_square}>
		  {this.symbol}
		</button>
	    );
	}
    }

    /* board class */
    class Board extends React.Component {
	constructor(props) {
	    super(props);
	    /*
	     * props:
	     *   player = string; X or 0
	     *     this is the current player
	     *     this will change on every render()
	     *   callback = callback
	     * */
	    this.squares = Array(9).fill("");
	    this.state = {game_ended: false};

	    this.move = this.move.bind(this);
	    this.check_row = this.check_row.bind(this);
	    this.check_col = this.check_col.bind(this);
	    this.check_diags = this.check_diags.bind(this);
	}

	check_row(index) {
	    if (this.squares[index] == this.props.player &&
		this.squares[index+1] == this.props.player &&
		this.squares[index+2] == this.props.player)
		return true;
	    return false;
	}

	check_col(index) {
	    if (this.squares[index] == this.props.player &&
		this.squares[index+3] == this.props.player &&
		this.squares[index+6] == this.props.player)
		return true;
	    return false;
	}

	check_diags() {
	    /* checks both diags at the same time */

	    /* main diagonal */
	    if (this.squares[0] == this.props.player &&
		this.squares[4] == this.props.player &&
		this.squares[8] == this.props.player)
		return true;

	    /* other diag */
	    if (this.squares[2] == this.props.player &&
		this.squares[4] == this.props.player &&
		this.squares[6] == this.props.player)
		return true;

	    return false;
	}

	check_victory() {
	    /*
	     * lazy method
	     *
	     * this works on this.squares and this.props.player
	     * checks each row, column and diagonal
	     * */
	    return this.check_row(0) || this.check_row(3) || this.check_row(6) ||
		this.check_col(0) || this.check_col(1) || this.check_col(2) ||
		this.check_diags();
	}

	check_full() {
	    for (var i in this.squares) {
		if (this.squares[i] == "")
		    return false;
	    }
	    return true;
	}

	move(square) {
	    /*
	     * function that gets called when square was marked
	     *
	     * it checks if the current player won
	     * if not, it checks if the board is full
	     * if not, just notify up to change player
	     * */
	    this.squares[square] = this.props.player;
	    if (this.check_victory() === true) {
		this.setState({game_ended: true, winner: this.props.player});
		return;
	    }

	    if (this.check_full() === true) {
		this.setState({game_ended: true, winner: null});
		return;
	    }

	    /* notify up */
	    this.props.callback();
	}

	renderSquare(i) {
	    return (
		<Square index={i} callback={this.move}
			player={this.props.player}
			game_ended={this.state.game_ended}/>
	    );
	}

	render() {
	    let status = "Player " + this.props.player;
	    if (this.state.game_ended == true) {
		if (this.state.winner == null)
		    /*
		     * really weird bug here, if status is too long
		     * the board will get out of shape
		     * */
		    //status = "Game ended, nobody won";
		    status = "Nobody won";
		else
		    status += " won";
	    }
	    else
		status += "'s turn";

	    return (
		<div>
		  <div className="status">{status}</div>
		  <div className="board-row">
		    {this.renderSquare(0)}
		    {this.renderSquare(1)}
		    {this.renderSquare(2)}
		  </div>
		  <div className="board-row">
		    {this.renderSquare(3)}
		    {this.renderSquare(4)}
		    {this.renderSquare(5)}
		  </div>
		  <div className="board-row">
		    {this.renderSquare(6)}
		    {this.renderSquare(7)}
		    {this.renderSquare(8)}
		  </div>
		</div>
	    );
	}
    }

    /* game class */
    class Game extends React.Component {
	constructor(props) {
	    super(props);
	    /*
	     * set start player - this might be saved in a const
	     * e.g. const start_player = "X";
	     * */
	    this.state = {player: "X"};

	    /* bind free functions */
	    this.move = this.move.bind(this);
	}

	move() {
	    /*
	     * function that gets called (bottom -> up) after every move
	     * right now it just changes player
	     * */

	    /* change player */
	    let new_player = this.state.player == "X" ? "0" : "X";

	    /* force a redraw - no other way to update child components */
	    this.setState({player: new_player});
	}

	render() {
	    return (
		<div className="game">
		  <div className="game-board">
		    <Board player={this.state.player} callback={this.move} />
		  </div>
		  <div className="game-info">
		    <div></div>
		    <ol></ol>
		  </div>
		</div>
	    );
	}
    }

    ReactDOM.render(
	<Game />,
	document.getElementById("root")
    );
}
