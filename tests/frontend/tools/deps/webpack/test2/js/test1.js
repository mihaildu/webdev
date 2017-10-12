// this will work
console.log("hello from test1.js");

// but this won't
var m1 = require("./mod1.js");
var m2 = require("./mod2.js");

m1.fcn1();
m2.fcn2();
