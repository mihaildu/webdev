/*
 * Random javascript tests.
 */

// global vars initialized at before anything else
var test9_global_var = 10;
test9_global_var2 = 20;
var test9_global_var3;

main();

function main(){
    // TODO regex test

    test27_generic_streams();
    //test26_fs();
    //test25_default_arg();
    //test24_inheritance();
    //test23_wrappers();
    //test22_type_coercion();
    //test21_prototypes();
    //test20_streams();
    //test19_let();
    //test18_strict_mode();
    //test17_classes();
    //test16_json();
    //test15_events();
    //test14_template_strings();
    //test13_arrow_functions();
    //test12_oop();
    //test11_queue();
    //test10_args();

    //test9_global_var3 = 30;
    //test9_global();

    //test12_error();
    //test11_boolean();
    //test10_date();
    //test9_math();
    //test8_statements();
    //test7_operators();
    //test6_numbers();
    //test5_string();
    //test4_arrays();
    //test3_fac(5);
    //test2_sum(10, 2);
    //test1();
}

function test27_generic_streams(){
    /*
     * continuing from test20
     * https://nodejs.org/api/stream.html
     * section with api for stream implementers
     *
     * generic read stream: require("stream").Readable
     * generic write stream: require("stream").Writable
     * I guess it's ok to call these interfaces
     *
     * require("stream").Readable needs a _read() method
     * require("stream").Writable needs a _write() method
     *
     * both of these use an internal buffer for data transfer (e.g. Buffer
     * class); see below examples on how to access them; the size of the
     * buffer is in highWaterMark
     *
     * require("stream").Readable
     *
     *   can work in 2 modes:
     *     flowing: read data when "data" event is emitted
     *     paused: use Readable.read()
     *   adding a "data" listener switches the reader to flowing mode
     *   (paused is default); to switch the stream back into paused mode
     *   stream.pause()/stream.unpipe() (read doc)
     *
     * require("stream").Writable
     *
     *   writes stuff to the write buffer using Writable.write()
     *   method; this can return false in which case the write should
     *   be resumed when "drain" event was emitted
     *
     *   to end the writing stream Writable.write() must be called; this
     *   will emit "finish" which will close the stream
     *
     *   proper way to check for error during transmission is to add
     *   a listener for "error"
     * */

    const Stream = require("stream");

    // first, create a basic reader stream
    const reader = new Stream.Readable();

    // you need to implement the _read method for the interface
    reader._read = function(n) {
	// push() will put data on the read buffer
	// so this will simulate a read of "test"
	// null will end the stream
	this.push("test");
	this.push(null);
    }

    // this turns the stream into flowing mode
    // I assume this keeps calling the _read underlying function
    reader.on("data", (chunk) => {
	console.log("Received data: " + chunk);
    });

    // to do more advanced stuff use variables
    // e.g. connecting a writer and a reader
    const reader2 = new Stream.Readable();
    const writer = new Stream.Writable();

    // use another variable for communication
    var shared = {cnt: 0, text:""};
    reader2.shared = shared;
    writer.shared = shared;

    // set up the reader
    // how is this called? I assume push emits "data"
    reader2._read = function(size) {
	if (this.shared.cnt > 0) {
	    // Readable.push puts data on the read buffer
	    this.push(this.shared.text);
	    this.shared.cnt--;
	}
    }
    reader2.on("data", (chunk) => {
	console.log("Received data: " + chunk);
    });

    // done function that is called after the writer
    // this is optional anyway
    // apparently this is used to check if the write was successful
    // (err is null)
    function done(err){
	// do nothing
    }

    // set up the writer
    // this needs a couple more methods like _writev, _final
    writer._write = function(chunk, encoding, done) {
	this.shared.text = chunk;
	this.shared.cnt = 1;
    }

    // write something
    // this pushes stuff on the write buffer
    // I assume the _write function takes chunks from it
    writer.write("message from writer");

    // this will emit "finish"
    writer.end();

    // you can get the buffer from both reader and writer at any time
    console.log(writer._writableState.getBuffer());
    console.log(reader._readableState.buffer);
}

function test26_fs(){
    /*
     * this is for node.js only
     * more about this at
     * https://nodejs.org/api/fs.html
     * */

    // this is the file system module
    var fs = require("fs");

    // you can do stuff like unlink, rename, stat
    // this is an async call (it won't block waiting for stats)
    fs.stat("./test", (err, stats) => {
	if (err){
	    console.log("There has been an error: " + err);
	} else {
	    // TODO document JSON.stringify; last arg is spacing level
	    console.log("Stats for file 'test':\n" +
			JSON.stringify(stats, null, 2));
	}
    });

    // reading a file sync (it blocks until op is done)
    console.log(fs.readFileSync("./test", "utf8"));

    // reading a file async
    fs.readFile("./test", "utf8", (err, data) => {
	if (err) {
	    // err
	} else {
	    console.log(data);
	}
    });

    /*
     * writing to a file async
     *
     * flags:
     *   r = read
     *   r+ = reading and writing
     *   a = append
     *   https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback
     * */
    var write_options = {encoding: "utf8", mode: 0o666, flag: "a"}
    fs.writeFile("./test", "New text", write_options, (err) => {
	if (err){
	    // err
	} else {
	    console.log("The file has been saved");
	}
    });

    // opening a file (returns file desc)
    const fd = fs.openSync("test", "r+");

    // this creates a buffer of size 20
    // more on buffers
    // https://nodejs.org/api/buffer.html
    var buff = Buffer.alloc(20);

    var offset, length, position;
    offset = 0; // this is in the buffer
    length = 10; // num bytes to read
    position = 0; // this is in file

    // reading from fd
    fs.read(fd, buff, offset, length, position,
	    (err, bytes_read, buffer) => {
		console.log("Num byte read: " + bytes_read);
		console.log("buffer: " + buffer);
	    });
}

function test25_default_arg(){
    function fcn(arg1, arg2){
	console.log(arg1 + " " + arg2);
    }
    // arg2 will be undefined
    fcn("this is arg1");

    // the third arg will be ignored
    fcn("arg1", "arg2", 13);

    function fcn2(){
	// we can print all the arguments that we get using
	// "arguments"
	console.log(arguments);
	// we can also iterate through them
	for (var key in arguments){
	    console.log(arguments[key]);
	}
    }
    fcn2("one", 2, "10", true);
}

function test24_inheritance(){
    /*
     * TODO maybe make one big function for objects?
     * more on inheriting stuff
     *
     * JavaScript book pag 122
     * */

    // there is this thing called Object in js
    console.log(Object);
    console.log(typeof(Object));

    // apparently it's just a prototype declared as a function
    // something similar to this
    function fcn(){
	console.log("Hello from fcn");
	this.prop1 = 10;
	this.inner_fcn = function(){
	    console.log("Hello from inner fcn");
	}
    };
    console.log(fcn);
    console.log(typeof(fcn));

    // how to inspect a prototype in js?
    // is it possible? similar to dir in Python
    // TODO (here and down)
    console.log(fcn.prototype.toString());

    // creating an object with fcn prototype
    var fcnobj = new fcn();
    console.log(Object.getPrototypeOf(fcnobj));

    // back to inheritance
    // o is an object that inherits stuff from Object
    var o = {};
    // we now add a new prop; this doesn't modify the prototype
    o.x = 10;

    // we now create a new var p that inherits from o
    var p = Object.create(o);
    // the prototype of p is o, which has x
    // but p itself doesn't have this property
    // however, it can be accessed via p.x
    console.log(Object.getPrototypeOf(p));
    console.log(p);
    console.log(p.x);
}

function test23_wrappers(){
    /*
     * normally a primitive type like a string shouldn't behave
     * like an object; however, "string" type has a "length"
     * property
     *
     * apparently js has a prototype/object for each primitive
     * type and when we try to access something like length
     * an automatic conversion happens
     * the classes have the same name as the primitive types,
     * but they start with uppercase letter
     * */
    var str = "my string";
    console.log(str.length);
    console.log(typeof(str));

    // the object it gets converted to is String
    var str2 = new String("my second string");
    console.log(str2.length);

    // the object for number
    var nr1 = new Number(10);
    console.log(nr1);
}

function test22_type_coercion(){
    /*
     * this is about automatic type conversion
     * javascript has the following (primitive) types:
     *   boolean (true/false)
     *   number (double 64bit)
     *   string (char is also a string)
     *   null
     *   undefined
     *   symbol (new in ES6)
     *
     * non-primitive types are basically objects
     * */

    // when you do this, the number will be converted to string
    // outputs "1234"
    // this is type coercion
    console.log(123 + "4");

    // because of type coercion this will be true (similar to php)
    if (1 == "1") {
	console.log("1 = '1'");
    }

    // use identity operator
    if (1 === "1") {
	console.log("1 === '1'");
    }
}

function test21_prototypes(){
    /*
     * once again, in javascript everything is an object
     * objects have variables/functions - this is called a prototype
     * */

    // this is a prototype
    function Person(first, last, age, eyecolor){
	this.first = first;
	this.last = last;
	this.age = age;
	this.eyecolor = eyecolor;
    }

    // this is a javascript object with "Person" prototype
    var Tim = new Person("Tim", "Timothy", 30, "blue");
    console.log(Tim);

    // this is also a prototype
    class PersonClass {
	constructor(first, last, age, eyecolor) {
	    this.first = first;
	    this.last = last;
	    this.age = age;
	    this.eyecolor = eyecolor;
	}
    }

    // this is a javascript object with "PersonClass" prototype
    var John = new PersonClass("John", "Jonathan", 29, "green");
    console.log(John);

    // this is also an object
    // the prototyp is specified when creating the object
    var Sam =
	{
	    first: "Sam",
	    last: "Samuel",
	    age: 15,
	    eyecolor: "brown",
	    1: "one",
	};
    console.log(Sam);

    // you can change the prototype of an object as you go
    Sam.job = "Farmer";
    // or
    Sam["gender"] = "male";
    console.log(Sam);

    // fun fact: the bracket notation can be used for props that have
    // a reserved name/invalid notifiers (e.g. 1)
    // or if you have a string that has the prop name (you can't do obj.str)
    // also, the dot notaion might be faster

    // this will generate an error
    //console.log(Sam.1);

    // but this will work
    console.log(Sam["1"]);

    // equality between objects
    var Sam2 = Sam;
    var Sam3 = {};

    // this is true
    if (Sam == Sam2){
	console.log("Sam = Sam2");
    }
    // this is false
    if (Sam == Sam3){
	console.log("Sam = Sam3");
    }

    // this is also true
    if (Sam === Sam2){
	console.log("Sam === Sam2");
    }
    // this is false
    if (Sam === Sam3){
	console.log("Sam === Sam3");
    }

    // adding a function to a js object
    John["say_hi"] = function(){
	console.log("Hello everyone, my name is " + this.first);
    }
    John.say_hi();

    // if we look at the prototypes they both show as a function
    console.log(Person);
    console.log(PersonClass);

    // if we add a new property to the prototype it will be added
    // outside for some reason so objects that use this proto
    // cannot access it
    Person.nationality = "English";
    console.log(Person);

    // to add it to the prototype, you need to use the keyword prototype
    // this will update the old objects as well
    Person.prototype.nationality = "British";

    // nothing is changed when we print Person, since this is
    // inside the function
    console.log(Person);

    // it won't be displayed when we print entire objects because it's
    // stored in a different place (I assume it's run time vs compile
    // time sort of thing)
    console.log(Tim);
    // but it's there if we try to access it
    console.log(Tim.nationality);

    // long story short, variables/properties added to the prototype
    // rather than the object will be stored in __proto__
    // TODO how to get all __ props for an object
    console.log(Tim.__proto__);

    // there is a nicer way than __proto__
    console.log(Object.getPrototypeOf(Tim));

    // this will print everything (including proto vars)
    console.log(get_keys(Tim));

    // you can print props only specific to the object with multiple methods
    console.log(Object.keys(Tim));
    console.log(Object.getOwnPropertyNames(Tim));
}

function test20_streams(){
    /*
     * so streams are instances of eventemitter
     * Stream class in "stream" module
     *
     * this has some subclasses
     *   Readable
     *   Writeable
     *   Duplex
     *   Transform
     *   PassThrough
     *
     * more on streams at
     * https://nodejs.org/api/stream.html
     * */

    // fs module also has read/write streams
    var fs = require("fs");

    // opening a read stream
    var rstream = fs.createReadStream("test2");
    rstream.on("open", (fd) => {
	console.log("File has been opened, fd is " + fd);
    });
    rstream.on("data", (chunk) => {
	console.log("Received data: " + chunk);
    });

    // we can also open a write stream on the same file
    const woptions = {
	flags: "a",
	defaultEncoding: "utf8",
	fd: null,
	mode: 0o666,
	autoClose: true,
    };
    var wstream = fs.createWriteStream("test2", woptions);
    // this should trigger "data" listener on reader
    wstream.write("new writen text");

    // you can also pipe streams like so
    // this means that whenever the reading stream gets something
    // it will be automatically sent to the writing one
    //rstream.pipe(wstream);
}

function test19_let(){
    /*
     * let vs var
     * var: if the variable is already defined it will use it
     * let: same case - will use a new one
     * */

    var x = 10;
    {
	// x is already defined
	// so this is the same variable as before
	var x = 2;
	console.log(x);
    }
    console.log(x);

    let y = 10;
    {
	// this is a different y
	let y = 2;
	console.log(y);
    }
    console.log(y);
}

function test18_strict_mode(){
    /*
     * so strict mode is a thing in javascript
     * when you use it, some features are disabled
     * e.g. implicitly declared variables
     * */

    // this is an implicitly declared var
    mvar = 100;
    console.log(mvar);

    // if we turn on strict mode this will generate an error
    // however, this only works if we use "use strict;" at
    // the beginning of a file so check test4.js
}

function test17_classes(){
    /*
     * apparently we also have classes in js
     * this is from ECMAScript 2015
     * I guess these are still javascript objects in the end (json)
     * */
    class Animal {
	// this is the constructor
	constructor(age=10) {
	    this.age = age;
	}

	// this is how you define functions
	say_age(){
	    // apparently \n is automatically appended at the end in
	    // console.log
	    console.log("My age is " + this.age);
	}

	// a getter function
	get type(){
	    if (this.age > 10)
		return "old";
	    return "young";
	}

	// you can also have setter functions for whatever reasons
	set secret(age){
	    this.age = age;
	}

	speak(){
	    console.log("I make noise");
	}
    }

    class Dog extends Animal {
	speak(){
	    console.log("I bark");
	}
    }

    /*
     * apparently the fact that you can call functions before you define
     * them is called hoisting; this works because the variables and
     * function declarations are put in memory at compile/interp? phase.
     *
     * anyway, the same doesn't happen for classes, you need to declare
     * them first
     *
     * I assume Array is a class as well (similar behaviour)
     *
     * this will also print like a json with the class name in front
     * */
    var mpet = new Animal(2);
    console.log(mpet);
    console.log(mpet.age);
    mpet.say_age();

    // you can use the getter like this
    console.log("My pet is " + mpet.type);

    // setter
    mpet.secret = 19;
    console.log(mpet.age);

    // inheritance and stuff
    var mdog = new Dog();
    mpet.speak();
    mdog.speak();

    // TODO mixins
}

function test16_json(){
    // also look at test7_operators()
    // json = javascript object notation
    // similar to dicts in python
    var json1 =
	{
	    "name": "tim",
	    "age": 100
	};
    console.log(json1);

    // you can also have functions inside json
    var json2 =
	{
	    "name": "john",
	    "age": 10,
	    "say_hello": function(){
		console.log("hello");
	    },
	    "sex": "male",
	};
    console.log(json2);

    // accessing one element
    console.log(json1["name"]);
    console.log(json1.age);
}

function test15_events(){
    /*
     * this is about node.js events
     * https://nodejs.org/api/events.html
     * "events" module exports the EventEmitter class
     *
     * this is the prototype:
     *   [Function: EventEmitter],
     *   EventEmitter: [Circular],
     *   usingDomains: false,
     *   defaultMaxListeners: [Getter/Setter],
     *   init: [Function],
     *   listenerCount: [Function]
     * */
    const EventEmitter = require("events");

    // I assume EventEmitter.EventEmitter is there to access the props
    console.log(EventEmitter);

    // why do we do this?
    // can't we use EventEmitter directly?
    // I guess this is for personalized use
    class MyEmitter extends EventEmitter {}

    // apparently both work
    //const my_emitter = new MyEmitter();
    const my_emitter = new EventEmitter();

    // register a callback
    // "attaching a function"
    // you can attache multiple functions to same event
    // they will be called in order
    // also, calling different events will be run in the same order
    // with the exception below
    my_emitter.on("event", event_func);
    function event_func(){
	console.log("event occured");
    }

    // fire the event
    my_emitter.emit("event");

    // you can also pass args
    my_emitter.on("new event", (a, b) => {
	// the comma , adds a space between a and b
	// (between different args)
	console.log(a, b);
	// because I used an arrow function
	// printing this will take a lot of text (it's not the eventemitter)
	//console.log(this);
    });
    my_emitter.emit("new event", "this is a", "this is b");

    my_emitter.on("this", function(){
	console.log(this);
    });
    my_emitter.emit("this");

    // async
    // I assume these will not be called in order with the other events
    // e.g. the messages won't be printed between "this" and "once"
    my_emitter.on("async", function(){
	setImmediate(() => {
	    console.log("hello from callback 1");
	});
    });

    my_emitter.on("async", function(){
	setImmediate(() => {
	    console.log("hello from callback 2");
	});
    });
    my_emitter.on("async", function(){
	setImmediate(() => {
	    console.log("hello from callback 3");
	});
    });

    my_emitter.emit("async");
    my_emitter.emit("async");

    // you can register a listener that will be called only once
    my_emitter.once("once", function(){
	console.log("once was called");
    });
    my_emitter.emit("once");
    my_emitter.emit("once");

    // emitting an event without handler won't do anything
    my_emitter.emit("something");

    // there is an error registered function that throws an error
    // in this case the error will be thrown to the process
    // to catch it/guard against crashing
    /*
    process.on("uncaughtException", (err) => {
	console.error("there's an error - " + err);
    });

    my_emitter.emit("error", new Error("oops"));
    */

    // this also works
    my_emitter.on("error", (err) => {
	console.error("error caught at emitter level");
    });
    my_emitter.emit("error", new Error("oops 2"));

    // when we register a listener/handler
    // the event "newListener" will be emitted

    // we add a new handler for "newListener"
    // this will emit a new "newListener" so we'll loop forever
    // unless we use once
    my_emitter.once("newListener", (event, listener) => {
	if (event == "newlisten"){
	    // we can insert a new listener at the front
	    console.log("B");
	}
    });

    // before this listener is registered, newListener is called
    my_emitter.on("newlisten", () => {
	console.log("A");
    });

    my_emitter.emit("newlisten");

    // we can also remove listeners => removeListener is emitted

    // we can see how many listeners we have on some event
    console.log(EventEmitter.listenerCount(my_emitter, "async"));

    // this also works
    console.log(my_emitter.listenerCount("async"));

    // more methods at
    // https://nodejs.org/api/events.html
}

function test14_template_strings(){
    /*
     * this only works in node v4 I guess
     * I only tested with v8.2.1 and it doesn't work
     * */
    var my_name = "john";
    var str = "hello ${my_name}";
    console.log(str);
}

function test13_arrow_functions(){
    /*
     * you can also use arrow notation for functions like so
     * (param1, param2, …, paramN) => { statements }
     * more at https://developer.mozilla.org/en/docs/Web/JavaScript/...
     *                 Reference/Functions/Arrow_functions
     * in a way this is similar to anonymous functions
     * */
    var words = ["word1", "something", "etc"];

    // we want to map the list with string length function
    var lengths = words.map(function(word){
	return word.length;
    });
    console.log(lengths);

    // instead of writing "function" we can use arrow notation
    var lengths2 = words.map((word) => {
	return word.length;
    });
    console.log(lengths2);

    // we can also drop the () and {} with one arg and one statement
    var lengths3 = words.map(word => word.length);
    console.log(lengths3);
}

function test12_oop() {
    // use functions as classes/namespaces
    function MyClass() {
	this.x = 0;
	this.some_func = function(val) {
	    this.x = this.x + val;
	    console.log("New value for x: " + this.x);
	}
    }

    var obj = new MyClass();
    obj.some_func(10);
    obj.some_func(5);
}

function test11_queue(){
    var marray = new Array();

    // this inserts at the beginning
    marray.unshift(10);
    marray.unshift(2);
    marray.unshift(3);
    console.log(marray);

    // this removes from the end
    marray.pop();
    console.log(marray);
}

// returning all keys (props/functions) for an object
// this will return proto stuff as well
// so it's a bit different than Object.keys()
function get_keys(obj){
    var keys = [];
    for (var key in obj){
	keys.push(key);
    }
    return keys;
}

// searching for methods in an object
function get_methods(obj){
    var res = [];
    for(var m in obj) {
	if(typeof obj[m] == "function") {
	    if (m.search("height") >= 0) {
		res.push(m);
	    }
	}
    }
    return res;
}

function test10_args(){
    // use bind() for partial functions
    // first argument is "this"
    var partial_func = test10_func.bind(null, 5);
    console.log(partial_func(2));
}

function test10_func(arg0, arg1){
    return arg0 + arg1;
    //console.log(arg0);
}

function test9_global(){
    console.log(test9_global_var);
    console.log(test9_global_var2);
    console.log(test9_global_var3);
}

function test12_error(){
    // apparently division by 0 = infinity (no error)
    // this prob works in html files
    var x;
    try {
	x = adlakdj;
    } catch(err) {
	console.log(err);
    }
    console.log(x);
}

function test11_boolean(){
    console.log(Boolean(10 > 9));
}

function test10_date(){
    var d = new Date();
    console.log(d);

    var d2 = new Date("October 13, 2014 11:13:00");
    console.log(d2);

    // this is in ms since 01 jan 1970
    var d3 = new Date(5465454);
    console.log(d3);

    // year, month, day, hour, minute, second and ms
    var d4 = new Date(99, 5, 24, 11, 33, 30, 0);
    console.log(d4);
    // this looks nicer
    console.log(d4.toString());
}

function test9_math(){
    // using Math
    console.log(Math.PI);
    console.log(Math.sqrt(16));

    // sigmoid(x)
    var x = 1;
    var sg = 1 / (1 + Math.exp(-x));
    console.log(sg);
}

function test8_statements(){
    var x = 10;
    if (x == 10) {
	console.log("X is 10");
    } else if (x == 13) {
	console.log("X is 13");
    } else {
	console.log("X is neither 10 or 13");
    }

    var s = 0;
    for (var i = 0; i < 6; i++) {
	s = s + i;
    }
    console.log(s);

    // iterating through array
    var cars = ["bmw", "porsche", "mustang"];
    var all_cars = "";
    // for loop/statement
    for (var i = 0; i < cars.length; i++) {
	all_cars = all_cars + cars[i] + " ";
    }
    console.log(all_cars);

    var names = ["john", "tim", "jim"];
    var all_names = "";
    // other for loop
    for (var i in names) {
	all_names = all_names + names[i] + " ";
    }
    console.log(all_names);

    s = 0;
    var j = 0;
    // while loop
    while (j < 6) {
	s = s + j;
	j++;
    }
    console.log(s);
}

function test7_operators(){
    /*
     * person is like Array()
     * official name: object
     * object is json (javascript object notation) in javascript
     */
    var person = {name:"john", age:10, sex:"male"};
    console.log(person);

    // delete
    delete person.age;
    console.log(person);

    /* apparently person.age is the real thing
     * person["age"] gets substituted to that
     * this is dot . notation vs bracket [] notation
     * */
    var arr = new Array();
    arr[0] = 10;
    arr["name"] = "john";
    console.log(arr);
    delete arr[0];
    console.log(arr);

    var arr = new Array();
    arr[0] = 10;
    arr[1] = 12;
    arr[2] = 36;
    arr[3] = 14;
    delete arr[3];
    console.log(arr[4]);

    // in - this is for properties
    var names = ["john", "tim", "jim"];
    console.log("tom" in names);
    console.log("tim" in names);
    console.log("length" in names);

    // instanceof
    console.log(names instanceof Array);

    // void = evaluates an expression and returns undefined
    // in html docs: javascript:void(0);
    console.log(void(0));
}

// numbers
function test6_numbers(){
    // these are both "numbers"
    var a = 10;
    console.log(typeof(a));
    var b = 10.3;
    console.log(typeof(b));

    // floating point works too
    var c = 12e-5;
    console.log(c);

    // some constants
    var d = Number.POSITIVE_INFINITY;
    console.log(d);
    if (d > 10) {
	console.log("Infinity is greater!");
    }

    // some functions
    console.log(Number.MAX_VALUE);
    sd = c.toString();
    console.log(typeof(sd));

    console.log(Number.isInteger(10.2));
}

// strings
function test5_string(){
    var s1 = "This is a string";
    console.log(s1);
    var s2 = 'This is also a string';
    console.log(s2);

    // these are objects
    var c = s1.charAt(0);
    console.log(c);
    console.log(s1.concat(s2));
    console.log(s1.substr(3, 5));
    console.log(s1.search("is a"));
}

function test4_arrays(){
    /*
     * a new Array() is just an object where indexes are properties
     * e.g. arr["0"] etc
     * and apparently arr[0] is type coercion for arr["0"]
     * also, good to know, length is not the length of the array
     * it's just the index of the last number prop + 1
     * TODO check this, it seems to work just fine on node, maybe
     * it's true just for browsers
     * nope, maybe it was fixed
     * */
    var a = new Array();
    a[0] = 5;
    a[1] = 3;
    a[2] = "hello";
    console.log(a);

    // we can sort the array
    a.sort();
    console.log(a);

    // adding one element at the end
    a.push("x");
    console.log(a);

    // removes last element
    a.pop();
    console.log(a);

    // splice removes elements
    // splice(index, howmany)
    a.splice(1, 1);
    console.log(a);

    // splice also adds elements
    // splice(index, 0, elem1, elem2 ...)
    a.splice(1, 0, "new elem");
    console.log(a);

    // this is also an array
    b = [10, -2, 7, 3];
    console.log(b);
    b.sort();
    console.log(b);
    console.log(b.length);

    // b is an object with 0, 1 ... props
    console.log(b["0"]);
    // type coercion for this one
    console.log(b[0]);
    // adding a new prop
    b[100] = 14;
    console.log(b);
    b["pizza"] = "good";

    // length seems to work just fine under node.js
    console.log(b);
    console.log(b.length);
}

// wrapper for factorial
function test3_fac(n){
    console.log(fac(n));
}

// factorial
function fac(n){
    if (n <= 1)
	return 1;
    return n * fac(n - 1);
}

// adds 2 numbers
function test2_sum(a, b){
    console.log(a + b);
}

// wrapper for _test1
function test1(){
    _test1();
    console.log(global_a);
}

// first javascript test
function _test1(){
    // this is a local variable
    var a = 10;
    console.log(a);

    // this is a global variable
    global_a = 100;
    console.log(global_a);
}
