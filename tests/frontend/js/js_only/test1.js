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

    test12_oop();
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
    for (var i = 0; i < cars.length; i++) {
	all_cars = all_cars + cars[i] + " ";
    }
    console.log(all_cars);

    var names = ["john", "tim", "jim"];
    var all_names = "";
    for (var i in names) {
	all_names = all_names + names[i] + " ";
    }
    console.log(all_names);

    s = 0;
    var j = 0;
    while (j < 6) {
	s = s + j;
	j++;
    }
    console.log(s);
}

function test7_operators(){

    // delete

    /* persone is like Array()
     * prob a json internally
     * official name: object
     * object is json (javascript object notation) in javascript
     */
    var person = {name:"john", age:10, sex:"male"};
    console.log(person);
    delete person.age;
    console.log(person);

    /* apparently person.age is the real thing
     * person["age"] gets substituted to that?
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

// arrays
function test4_arrays(){
    var a = new Array();
    a[0] = 5;
    a[1] = 3;
    a[2] = "hello";
    console.log(a);
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
