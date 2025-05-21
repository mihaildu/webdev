/*
 * fun fact: require only exists in node.js
 * if you load this script (test2.js) into a browser it will give error
 * that require doesn't exist
 */

// this will load test3.js into a json (only the exported stuff)
var t3 = require("./test3.js");
// this is taken from node_modules/
var us = require("underscore");

var tt = require("./test9.js")

console.log(tt.x)

// other way of importing from different files is using ES6 modules (TODO)

function main(){
    test1();
    //test2();
    //test3();
}

function test4(){

}

function test3(){
    console.log(us);
}

function test1(){
    console.log(t3);
}

function test2(){
    // this works only when t3 is a function
    t3();
}

main();
