/*
 * import is not yet implemented in node.js
 * so running this directly with node will fail
 * */
import test from "./mod";
import {obj1, obj2} from "./mod";

test("hello");

console.log(obj1);
console.log(obj2);
