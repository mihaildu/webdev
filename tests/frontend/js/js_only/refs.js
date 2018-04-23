/*
 * Random javascript tests.
 *
 * TODO
 * re-write this file without duplications in something like
 *   js/refs.js + js/refs-nodejs.js
 */

// global vars initialized at before anything else
var test9_global_var = 10;
test9_global_var2 = 20;
var test9_global_var3;

let lodash = require("lodash");
let objFilter = require("obj-filter");
let diff = require("deep-diff");

main();



function main(){
    test40_apply_pattern();
    //test39_random_color();
    //test38_filter();
    //test37_str_int();
    //test36_saving_this();
    //test35_scope_closures();
    //test34_global_object();
    //test33_prototypes_revised();
    //test32_this();
    //test31_json_prop();
    //test30_regex();
    //test29_move_props();
    //test28_env_vars();
    //test27_generic_streams();
    //test26_fs();
    //test25_default_arg();
    //test24_jsobj_and_inheritance();
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
    //test12_error();
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

function test40_apply_pattern() {
    /**
     * apply values from one 'values' object (1) to another
     * 'empty' object (2) only if keys exists in object (2)
     */
    const emptyObj = {
        a: 0,
        b: 0,
        c: {
            d: 0,
            e: 0
        },
        f: {
            g: 0,
            h: {
                i: 0
            }
        }
    };
    const values = {
        a: 10,
        c: {
            d: 100
        },
        f: {
            h: {
                i: 101,
                y: 200
            }
        },
        x: 1001
    };
    const expectedResult = {
        a: 10,
        b: 0,
        c: {
            d: 100,
            e: 0
        },
        f: {
            g: 0,
            h: {
                i: 101
            }
        }
    };

    function applyObj(obj1, obj2) {
        const obj3 = { ...obj1 };
        if (typeof obj2 !== "object") {
            return obj3;
        }
        Object.keys(obj3).forEach(key => {
            if (key in obj2) {
                if (typeof obj2[key] === "object") {
                    obj3[key] = applyObj(obj3[key], obj2[key]);
                } else {
                    obj3[key] = obj2[key];
                }
            }
        });
        return obj3;
    }

    /* applyObj works */
    const res1 = applyObj(emptyObj, values);
    console.log(diff(res1, expectedResult));

    /* obj-filter works as well */
    const filteredObj = objFilter(emptyObj, values);
    const res2 = objFilter.merge(emptyObj, filteredObj);
    console.log(diff(res2, expectedResult));

    /* lodash merge doesn't work */
    const res3 = lodash.merge(emptyObj, values);
    console.log(diff(res3, expectedResult));

    //console.log(JSON.stringify(res, null, 2));
}

function test39_random_color() {
    /**
     * ways to generate random color strings for css
     * example of css color string
     * #f0f8ff
     */

    /**
     * first solution
     *
     * Math.random() returns something like 0.1514659001777845
     * the precision seems random too (maybe trailing 0s are ignored)
     * so Math.random() * 1000000 will give 6 digits before comma
     * but when we convert to base 16, we get less digit
     * so we use 16777215 instead - TODO check this number is ok
     */
    console.log(Math.floor(Math.random() * 16777215).toString(16));
}

function test38_filter() {
    /**
     * filter an array based on some validation
     */
    const arr = [-5, 2, -1, 0, 6];
    const narr = arr.filter(number => number > 0);
    // only numbers > 0
    console.log(narr);
    // original array stays the same
    console.log(arr);
}

function test37_str_int(){
    /* converting from/to string to/from int */
    let s1 = "10";
    let n1 = parseInt(s1);
    console.log(n1);
    console.log(typeof(n1));

    /* this also works */
    let n2 = Number(s1);
    console.log(n2);
    console.log(typeof(n2));

    let n3 = 100;
    let s2 = String(n3);
    console.log(s2);
    console.log(typeof(s2));

    /* this works */
    let s3 = n3 + "";
    console.log(s3);
    console.log(typeof(s3));

    let s4 = n3.toString();
    console.log(s4);
    console.log(typeof(s4));
}

function test36_saving_this() {

    /*
     * in some case we might want to save this (e.g. react)
     * I guess there are some other ways to do this (prob bind(this),
     * or fcn.call(this, ...)), but we can also use anonymous functions
     * see example below
     *
     * the goal is to have a function, that returns another function
     * where this is saved from the first function call
     * */

    function fcn1() {
        /*
         * we want to save "this" for fcn1; however, in this case,
         * if we return fcn, whoever calls fcn will change "this"
         * */
        function fcn() {
            /* this won't be the same from fcn1 */
            console.log(this);
        }
        return fcn;
    }

    function fcn2() {
        /*
         * here "this" is saved, so it will be
         * whoever called fcn2 in the first place
         * */
        return () => console.log(this);
    }

    const obj1 = {name: "obj1", fcn1: fcn1, fcn2: fcn2};
    /* we call both fcn1 and fcn2 from obj1 */
    const obj2 = {name: "obj2", fcn1: obj1.fcn1(), fcn2: obj1.fcn2()};

    /* since fcn1 doesn't save "this", we will get obj2 */
    obj2.fcn1();
    /* in this case we get obj1 */
    obj2.fcn2();
}

function test35_scope_closures(){
    /* so scopes are delimited by functions, not if statements */
    var obj1 = 10;
    if (obj1 == 10){
	var obj2 = 100;
	/* this is the same obj as above */
	var obj1 = 2;
    }

    console.log(obj1);
    /* obj2 is the same one from the if statement */
    console.log(obj2);

    function fcn1(){
	/* this is obj1 from the outer scope (test35_scope) */
	console.log(obj1);

	/* something interesting can happen here
	 * so js has this "compilation" step where it builts the symbol
	 * tables for all the objects/scope tables
	 * this happens before the interpretation step
	 * */

	/* normally this would point to the outer obj2 */
	console.log(obj2);

	/* however, we declare a new obj2 in this scope as well */
	var obj2 = 200;

	/*
	 * since the scope table is built before running console.log(obj2)
	 * obj2 will actually be the one local to fcn1 with no value set
	 * (the obj2 = 200 instruction has not been run yet); so when
	 * console.log(obj2) is run, obj2 will have the value "undefined"
	 *
	 * this is also the reason why functions can be run before they
	 * are declared - the scope table (that has function names as well
	 * is built first); this is called hoisting
	 *
	 * sometimes this is explained as moving declarations to the top
	 *
	 * hoisting is also useful when you have functions that call eachother
	 * normally you would declare functions first (prototypes)
	 * or use an interface
	 * */
    }

    fcn1();
    /* obj2 has the original value of 100 */
    console.log(obj2);

    /*
     * since you can pass functions around, they will save scope of execution
     * it's somewhere in the javascript object I guess
     * this is called a closure (function + env/scope)
     * */
    var a = 0;
    function fcn2(){
	var b = 10;
	a++;
	b++;
	function fcn3(){
	    console.log(a);
	    console.log(b);
	}
	return fcn3;
    }

    /*
     * this is an instance of fcn3 that has a pointer to global.a
     * and fcn2.b; fcn2.b will still exist for fcn3 even if fcn2 ended
     * because it saved the scope
     * */
    var f1 = fcn2();
    f1();

    /*
     * this is another instance of fcn3 that has same things as above
     * the fcn2.b for this function is different that the prev one
     * so they are both 11, while a kept increasing
     * */
    var f2 = fcn2();
    f2();

    /*
     * it seems that there is no way to get function scope from code
     * you can do a bunch of other stuff
     * */

    /*
     * you can convert the function to a
     * string and look at local vars only
     *
     * this uses type coercion to convert it
     * */
    var f1s = f1 + "";
    console.log(f1s);

    /*
     * if you are too lazy to read the code yourself
     * you can re-parse the javascript code (just like js interpreter does)
     *
     * you can use something like esprima
     * http://esprima.org/demo/parse.html
     * */

    /*
     * closures allow us to use private variables even if javascript
     * doesn't support them
     *
     * simply wrap variables in a function scope, and just return
     * a set of function that modifies them
     *
     * this is called the module pattern
     * */
    function prfcn(){
	/* declare some private vars */
	var first_name;
	var last_name;

	/* place public functions in obj that will be returned */
	var ret = {
	    get_first_name: function(){
		return first_name;
	    },
	    get_last_name: function(){
		return last_name;
	    },
	    set_first_name: function(name){
		first_name = name;
	    },
	    set_last_name: function(name){
		last_name = name;
	    },
	};
	return ret;
    }

    var probj = prfcn();
    /* now you can't access prfcn.first_name, but you can use the functions */
    probj.set_first_name("Jim");
    probj.set_last_name("Jaxon");
    console.log(probj.get_first_name());
    console.log(probj.get_last_name());

    /*
     * possibly unrelated, but you can run anon
     * functions by wrapping them with ()
     *
     * you can also save scope like this
     *
     * this is called IIFE - immediately invoked function expression
     * */
    (function(){console.log("hello")})();
}

function test34_global_object(){
    /* Object is a global function */
    console.log(Object);

    /* you can use it to create js objects */

    /* the following 2 are the same */
    var obj1 = new Object();
    var obj2 = {};

    /* we can check by looking at the prototypes */
    if (obj1.__proto__ == Object.prototype)
	console.log("obj2 has Object.prototype");
    if (obj2.__proto__ == Object.prototype)
	console.log("obj1 has Object.prototype");

    /*
     * the prototype of a function/object is also an object that was
     * created with "new Object", so the prototype has Object.prototype
     * as prototype for itself
     *
     * I assume this is called inheritance/prototype chain in javascript
     * */
    function fcn(){
	this.val = 10;
    }
    if (fcn.prototype.__proto__ == Object.prototype)
	console.log("fcn.prototype has Object.prototype as proto");

    /* this means that every object can share props through Object.prototype */
    Object.prototype.myval = 100;
    var obj3 = new fcn();

    /*
     * this will look at obj3.myval, then fcn.prototype.myval, then
     * fcn.prototype.__proto__.myval which is Object.prototype.myval
     * */
    console.log(obj3.myval);

    /* you can do "manual" inheritance by modifying __proto__ for some objs */
    function Person(name){
	this.name = name;
    }
    function Driver(name, team){
	this.name = name;
	this.team = team;
    }

    /* add a function to Person prototype */
    Person.prototype.say_name = function(){
	console.log("Hello, my name is " + this.name);
    };

    /*
     * I want this function to be available for Driver too, so instead
     * of having Driver.prototype.__proto__ point to Object.prototype
     * we make it point to Person.prototype
     * */
    Driver.prototype.__proto__ = Person.prototype;

    var p1 = new Person("tim");
    var d1 = new Driver("john", "red");
    p1.say_name();
    d1.say_name();

    /* there is prob a nicer way to make Driver inherit from Person */

    /* this will create tst with an empty prototype object that has as proto
     * Person.prototype instead of Object.prototype
     * */
    var tst = Object.create(p1);
    if (tst.__proto__.__proto__ == Person.prototype)
	console.log("tst.__proto__ is linked to Person.prototype");

    /* you can also use it directly for the proto, which makes more sense */
    function Pilot(name){
	/* this will call Person() and "this" will be the obj that
	 * calls new Pilot()
	 * */
	Person.call(this, name);
	console.log("Pilot ctor got called");
    }

    /* link the Pilot proto to Person proto */
    Pilot.prototype = Object.create(Person.prototype);

    /* test on new object */
    var pi1 = new Pilot("timmy");
    pi1.say_name();

    /* you can also test the actual prototype */
    if (pi1.__proto__.__proto__ == Person.prototype)
	console.log("Pilot is linked to Person");
}

function test33_prototypes_revised(){
    /*
     * Another take at prototypes.
     *
     * So from my understanding now, prototypes are these things that should
     * allow us to use something similar to static in java - common properties
     * for javascript objects. Multiple javascript objects can have the same
     * prototype, and if you modify the prototype, it will apply the change to
     * all the objects (static var for example).
     *
     * From my understanding when you create a javascript object (without using
     * new/constructor), a new prototype will be created for that object that
     * will stay in memory. I guess this is the case where the prototype is
     * kind of useless. However, if you create it with "new", then it will
     * have the same prototype as the function/class/object that created it
     * (e.g. the constructor function). So functions have prototypes too,
     * that can be accessed with fcn.prototype and the function is the
     * constructor for the prototype (e.g. fcn.prototype.constructor)
     * */
    function fcn(){
	this.val = 10;
	console.log("call to fcn");
    }

    /* the function is an object in memory */
    console.log(fcn);

    /*
     * the function also has a prototype, which should be a different obj
     * by default this is an empty object
     * */
    console.log(fcn.prototype);

    /*
     * from the prototype you can access back the
     * function by using the constructor property
     *
     * this will also add all the props defined with this
     * to the prototype (e.g. val)
     * */
    console.log(fcn.val);
    fcn.prototype.constructor();
    console.log(fcn.prototype.val);

    /*
     * now you can create objects with the same
     * prototype as fcn (same object) using the "new" keyword
     *
     * obj1, obj2 and fcn will have the same prototype: fcn.prototype
     * to access the prototype from an object (rather than a function)
     * use obj.__proto__
     *
     * fun fact: that double underscore is called dunderscore
     *
     * everything defined with this in fcn will be added as a property
     * to obj1 and obj2
     * */
    var obj1 = new fcn();
    var obj2 = new fcn();
    console.log(obj1);
    console.log(obj2);

    if (obj1.__proto__ == fcn.prototype)
	console.log("obj1 has fcn.prototype");
    if (obj2.__proto__ == fcn.prototype)
	console.log("obj2 has fcn.prototype");

    /* this will also reconstruct the prototype object */
    fcn.prototype.val = 100;
    obj1.__proto__.constructor();
    obj2.__proto__.constructor();
    console.log(fcn.prototype.val);

    /* fun fact, if you call fcn(), since it's global scope, this will
     * be the global object, so val will be a global variable
     * */
    fcn();
    /* both of these work */
    console.log(global.val);
    console.log(val);

    /* fcn is a javascript object, but it will not have props
     * defined with this inside of it (that's just the function
     * code, nothing to do with its property); the prototype
     * will have the props only if constructor is called
     * */
    console.log(fcn.val);

    /* to show that the function is a different object than the prototype
     * look at the following example
     * */
    fcn.x = 100;
    console.log(fcn.x);
    console.log(fcn.prototype.x);
    console.log(obj1.x);

    /* now you can add stuff to the prototype and it will be accessible
     * from all the objects that share it
     * */
    fcn.prototype.name = "jim";
    console.log(obj1.name);
    console.log(obj2.name);

    /* but if you look at obj1, it doesn't have the name prop */
    console.log(obj1);

    /* so name is like a static variable
     * when you write obj1.name, the interpreter will first
     * look at the object props, if it's not there it goes to proto
     * so if you define obj1.name as well, then obj1 will have 2 props
     * called "name", one on itself and one on the prototype
     * in this case, the interpreter will pick the one on itself
     * this works like overwriting functions/variables in java
     * (or overshadowing)
     *
     * if you want to change the "static variable" name from obj1
     * you have to use __proto__ (or something like Object.getPrototypeOf())
     * */

    /* this will add name to obj1 and set it to
     * e.g. this won't change name for obj2
     * */
    obj1.name = "tom";
    console.log(obj1);
    console.log(Object.getPrototypeOf(obj1).name);
    console.log(obj1.__proto__.name);
    console.log(obj2.name);

    /* to change the static var name from proto, use __proto__
     * e.g. this will change name for obj2
     * */
    obj1.__proto__.name = "tommy";
    console.log(obj2.name);

    /* we can also add functions to the prototype */
    fcn.prototype.num_objs = 0;
    fcn.prototype.inc = function(){ this.num_objs = this.num_objs + 1; }
    fcn.prototype.inc();
    fcn.prototype.inc();
    console.log(obj1.num_objs);

    /* a more practical approach */
    function fcn2(){
	/* increase the number of defined objects */
	this.__proto__.num_objs += 1;
    }
    /* start at 0 */
    fcn2.prototype.num_objs = 0;

    var obj3 = new fcn2();
    var obj4 = new fcn2();
    console.log(obj4.num_objs);

    /*
     * this won't break if you call fcn2(), it will just add
     * __proto__.num_objs = NaN to global object
     *
     * the thing to remember is that prototypes link objects together
     * */
}

function test32_this(){

    /*
     * So apparently there are 4 ways to call a function in javascript
     * (didn't check). For each way, the this object is different.
     *
     * Ways to call a function:
     *   * in the global scope - this is window/global
     *   * from an object - this refers to the object
     *   * in constructor mode/with new in front - this is the returned object
     *   * with call() - you can specify who this is, as arg
     *
     * As a side note, process is just a property of global
     */

    /* global scope - 1st way */
    function fcn(){
	if (global == this)
	    console.log("global = this");
	else
	    console.log("this is " + this);
    }
    fcn();

    /* from an object - 2nd way */
    var obj = {};
    obj.fcn = fcn;
    obj.fcn();

    /*
     * in constructor mode - 3rd way
     * this adds this = {}, return this; in the function
     * */
    var obj2 = new fcn();

    /*
     * using call(this, ...) - 4th way
     * call() will take as 1st arg an object that will represent this
     * so you can use whatever you want for this
     * */
    fcn.call(global);
}

function test31_json_prop(){
    /* this works */
    var test = 100;
    var obj = {
	test: test,
    };
    console.log(obj);
}

function test30_regex(){
    /*
     * Regular expressions in javascript
     */
    let re;

    // this is a regular exp that will match a
    re = /^a$/;
    console.log("type of regexp = " + typeof(re));
    console.log("/^a$/ matches a: " + re.test("a"));
    console.log("/^a$/ matches ab: " + re.test("ab"));

    /*
     * I guess /re/ will automatically convert to RegExp (js object)
     * Special characters
     *   ^: beginning of string
     *   $: end of string
     *   +: at least once
     * */

    // you can create a re from a string like so
    re = new RegExp("a+b");

    // this will match strings that have (ab, aab, ...) in them
    console.log("/a+b/ matches xabz: " + re.test("xabz"));
    console.log("/a+b/ matches xbz: " + re.test("xbz"));

    /*
     * Some special characters in strings need to be escaped (e.g. backslashes)
     * You can do automatic escaping when converting from string to re using
     * re.source
     *
     * e.g. we want to match "a+"
     * */

    // this won't do since it means (a, aa, ...)
    re = new RegExp("^a+$");
    console.log(re.test("a+"));

    // this won't do since \+ is interpreted as a special char in the string
    re = new RegExp("^a\+$");
    console.log(re.test("a+"));

    // this will do since we escaped the \
    re = new RegExp("^a\\+$");
    console.log(re.test("a+"));

    // doing this without escaping (using source)
    re = new RegExp(/^a\+$/.source);
    console.log(re.test("a+"));

    // splitting into multiple strings (useful for long REs)
    re = new RegExp(/^a/.source + /\+$/.source);
    console.log(re.test("a+"));

    // matching /
    re = new RegExp(/^\/$/.source);
    console.log(re.test("/"));
}

function test29_move_props(){
    /* Object.assign() will append one js object to another */
    obj1 = {prop1: "p1", prop2: "p2"};
    obj2 = {prop3: "p3", prop4: "p4"};
    /* this will add obj2 to obj1 */
    Object.assign(obj1, obj2);
    console.log(obj1);

    /* if dest obj already has prop, it will be updated */
    obj3 = {prop1: "p1", prop2: "p2"};
    obj4 = {prop2: "p3", prop4: "p4"};
    Object.assign(obj3, obj4);
    console.log(obj3);

    /*
     * some other options to try:
     * req.session = {req.session, ret.session}
     * */

    /* to duplicate one object we can use spread operator */
    const original = {a: 1, b: 2};
    const dup = {...original};
    console.log(dup);

    /* we can do the same to copy/dup arrays */
    const items = [1, 2, 3];
    const itemsCopy = [...items];
    console.log(itemsCopy);

    const original2 = {a: 1, b: 2};
    const dup2 = {...original2, a: 3};
    console.log(original2);
    console.log(dup2);

    const lst = [];
    lst.push(10);
    console.log(lst);
}

function test28_env_vars(){
    /*
     * all env variables are accessible via process.env (json)
     * to run this with NODE_ENV set:
     *   NODE_ENV=test node test1.js
     */
    if(typeof(process.env["NODE_ENV"]) != "undefined"){
	console.log(process.env["NODE_ENV"]);
    }
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

function test24_jsobj_and_inheritance(){
    /*
     * TODO maybe make one big function for objects?
     * added object props here too
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

    /*
     * checking for variables/properties
     *
     * when checking if a variable is set this works
     *   1. if (typeof(myvar) == "undefined") {}
     *
     * if (myvar) - could fail if myvar is a boolean set to false
     *
     * checking if a js object has a certain property
     * the above method works (e.g. typeof(myvar.prop) == "undefined")
     * other methods of doing this:
     *   2. if (myvar.prop == undefined) {}
     *      - no type coercion here
     *      - this will crash if tested directly for myvar
     *   3. if ("prop" in myvar) {}
     *   4. using every (easier for multiple props)
     */
    if (typeof(random_var) == "undefined")
	console.log("random_var is not defined");
    else
	console.log("random_var is defined");

    // just writing "var myvar;" leaves it undefined as well
    var myvar = {};
    myvar.prop1 = "undefined";
    if (myvar.prop1 == undefined)
	console.log("myvar.prop1 is not defined");
    else
	console.log("myvar.prop1 is defined");

    myvar.prop2 = 10;
    if ("prop2" in myvar)
	console.log("myvar.prop2 is defined");
    else
	console.log("myvar.prop2 is not defined");

    myvar.prop3 = 100;
    // we use shorthand arrow notation for functions
    props = ["prop1", "prop2", "prop3"];
    if (props.every(prop => prop in myvar))
	console.log("myvar has all props: prop1, prop2 & prop3");
    else
	console.log("myvar is missing a prop");
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

    /*
     * printing objects
     *
     * most of the time using console.log(obj) will work just fine
     * however, sometimes this will only print [object Object]
     *
     * TODO figure out when this happens exactly
     *   in connection.query(query, function(err, rows, fields))
     *   console.log(rows); will print [object Object]
     * I think this happens when you concatenate a string with an obj
     * type coercion in concat(str, obj) TODO test this
     *
     * to print it in that case simply use JSON.stringify(obj)
     *
     * JSON.stringify(obj, null, 2) can also pretty print an obj
     * in the prev example, the spacing on each line is 2
     *
     * JSON.stringify() turns a javascript object into a string
     * with some pretty formatting (optional)
     */

    // TODO test this and edit above
    var pobj = {prop1: "val1", prop2: "val2"};
    console.log("pobj = " + pobj);

    // example of pretty printing
    console.log(JSON.stringify(pobj, null, 2));
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
    // if statements
    var x = 10;
    if (x == 10) {
	console.log("X is 10");
    } else if (x == 13) {
	console.log("X is 13");
    } else {
	console.log("X is neither 10 or 13");
    }

    var y = 11;
    if (x == 10 && y == 11)
	console.log("x is 10 and y is 11");

    var s = 0;
    for (var i = 0; i < 6; i++) {
	s = s + i;
    }
    console.log(s);

    // iterating through array
    var cars = ["bmw", "porsche", "mustang"];
    var all_cars = "";

    // for loop statement
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

    /*
     * other for loop
     *
     * if you want to skip an element use "return" and not
     * "continue" since this is a function and not a proper for loop
     */
    names.forEach(function(name){
	console.log(name);
    });

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

    // adding elem at the beginning - unshift
    let marr = [1, 2, 3];
    marr.unshift(0);
    console.log(marr);

    // you can also add multiple elements
    marr.unshift(-1, -2);
    console.log(marr);

    // remove specific element from array
    let arr = [1, 2];
    arr.splice(arr.indexOf(2), 1);
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
