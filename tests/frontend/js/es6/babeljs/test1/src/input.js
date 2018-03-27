/**
 * ES6 refs
 * To run this file
 * node_modules/.bin/babel input.js > output.js
 */

let obj = 100;

/* object destructuring */
const mobj = {firstVal: 100, secondVal: 200};
const {firstVal, secondVal} = mobj;
console.log(firstVal);
console.log(secondVal);

/* object destructuring - different names */
const {firstVal: f, secondVal: s} = mobj;
console.log(f);
console.log(s);
