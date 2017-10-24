/*
 * export only implemented in Safari and Chrome
 * it's not yet implemented in Node as well
 *
 * it works like module.exports I assume
 *
 * two types of exports: named exports and default ones
 * you can have multiple named exports but only one
 * default
 *
 * named export: export { obj1, obj2 ... };
 * default export: export default function(){...}
 * */

function fcn1() {
    console.log("Hello from fcn1 mod3");
}

var obj1 = {
    name: "obj1",
    value: 9001
};

/*
 * we want to export fcn1 and obj1
 * this is a named export since we use object names
 * */
export { fcn1, obj1 };

/* this is a default export (there can be only one) */
export default class {
    fcn() {
	console.log("hello from default exported class");
    }
}
