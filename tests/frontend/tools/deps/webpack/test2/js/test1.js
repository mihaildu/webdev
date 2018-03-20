/*
 * importing with import
 *
 * named imports (see exports): import { obj1, obj2, ...} from "./mod.js";
 * default imports: import k from "./mod.js";
 * */

/* name import, name of obj (fcn1) must match */
import { fcn1 } from "./mod3";

/*
 * default import (we can use whatever name we want)
 * here kfcn will be the default export thing from mod3 (class {fcn()...})
 * */
import kfcn from "./mod3";

import {mvar1, fcn2, fcn3} from "./mod3";

import Immutable from "immutable";
import { decamelize } from "humps";


main();

function main() {
    test9_humps();
    //test8_import_vars();
    //test7_componse();
    //test6();
    //test5_iterators();
    //test4();
    //test3();
    //test2();
    //test1();
}

function test9_humps() {
    console.log(decamelize("camel-caseXdsakj", {separator: " "}));
}

function test8_import_vars() {
    console.log(mvar1);
    fcn3();
    console.log(mvar1);
}

function test7_componse() {
    /*
     * componse is some es6 thing used to compose functions
     * */
    function fcn1(val) {
        return val + 1;
    }
    function fcn2(val) {
        return val * 10;
    }
    const composedFunction = compose(fcn1, fcn2);
    const res = composedFunction(2);
    console.log(res);
}

function test6() {
    const omap1 = Immutable.OrderedMap({a: 10});
    const omap2 = omap1.set("b", 100);
    console.log(omap1);
    console.log(omap2);
}

function test5_iterators() {
    /* iterators in ES6 */
    const arr = [1, 2, 3];
    const it = arr.entries();

    // [object Array Iterator]
    console.log(it.toString());

    var next_item = it.next();
    // { value: [ 0, 1 ], done: false }
    console.log(next_item);
    // destructuring
    var [key, value] = next_item.value;
    console.log(key);
    console.log(value);
    console.log(it.next());

    // iterating - my way
    const arr2 = [3, 4, 5, 6];
    const it2 = arr2.entries();
    var item;

    while(true) {
	item = it2.next();
	/* last element has value = undefined */
	if (item.done === true)
	    break;
	[key, value] = item.value;
	console.log(key + ":" + value);
    }

    /* ...iterator will put all the values in a list */
    const arr3 = [1, 2, 3];
    const it3 = arr3.entries();
    console.log(...it3);
}

function test4() {
    /* TODO - move this to a more appropriate section (prob es6)
     * immutable.js
     * https://facebook.github.io/immutable-js/
     *
     * so Immutable has data structures that don't get updated
     * instead a new copy is returned on every operation
     *
     * List, Stack, Map, OrderedMap, Set, OrderedSet and Record
     * */
    const map1 = Immutable.Map({a: 1, b: 2, c: 3});
    const map2 = map1.set("b", 10);
    console.log(map1);
    console.log(map2);

    const omap1 = Immutable.OrderedMap({a: 10, b: 20, x: 100});
    console.log(omap1);

    /*
     * iterating through Map
     * apparently this doesn't guarantee order
     * */
    const it1 = map1.entries();
    var item, value, key;
    while(true) {
	item = it1.next();
	if (item.done === true)
	    break;
	[key, value] = item.value;
	console.log(key + ":" + value);
    }

    /*
     * iterating through Map
     * this does guarantee order
     * */
    const it2 = omap1.entries();
    while(true) {
	item = it2.next();
	if (item.done === true)
	    break;
	[key, value] = item.value;
	console.log(key + ":" + value);
    }
}

function test2() {
    fcn1();
}

function test3() {
    var mobj = new kfcn();
    mobj.fcn();
}

function test1() {
    /* importing with require() */

    // this will work
    console.log("hello from test1.js");

    // but this won't by default
    var m1 = require("./mod1.js");
    var m2 = require("./mod2.js");
    m1.fcn1();
    m2.fcn2();
}
