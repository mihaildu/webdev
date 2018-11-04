main();

function main() {
  /*
   * Interview questions from different websites
   *
   * https://www.toptal.com/javascript/interview-questions
   * TODO
   * */

  //console.log(typeof(undefined));
  //test29();
  //test28();
  //test27();
  //test26();
  //test25();
  //test24();
  //test23();
  //test22();
  //test21();
  //test20();
  //test19();
  //test18();
  //test17();
  //test16();
  //test15();
  //test14();
  //test13();
  //test12();
  //test11();
  //test10();
  //test9();
  //test8();
  //test7();
  //test6();
  //test5();
  //test4();
  //test3();
  //test2();
  //test1();
}

function test30() {
    
}

function test29() {
    console.log(typeof typeof 1);
}

function test28() {
    // false
    console.log(typeof(undefined) == typeof(null));
}

function test27() {
    var a = [1, 2, 3];
    a[10] = 99;
    console.log(a);
    console.log(a[6]);
}

function test26() {
    let arr = [2, 3];
    arr.push(4);
    console.log(arr);

    arr.unshift(1);
    console.log(arr);
}

function test25() {
    // it's actually true and false
    // 1
    console.log(1 < 2 < 3);
    // 0
    console.log(3 > 2 > 1);
}

function test24() {
    // cloning an obj
    var obj = {a: 1, b: 2};
    var obj2 = {};
    Object.assign(obj2, obj);
    console.log(obj2);

    var obj3 = {...obj};
    console.log(obj3);
}

function test23() {
  (function () {
    try {
      throw new Error();
    } catch (x) {
      var x = 1, y = 2;
      console.log(x);
    }
    console.log(x);
    console.log(y);
  })();

  // this is the same as
  (function () {
    var x, y;
    try {
      throw new Error();
    } catch (x) {
      // this x is not the same as the prev one
      x = 1;
      y = 2;
      console.log(x);
    }
    console.log(x);
    console.log(y);
  })();
}

function test22() {
  length = 10;
  function fn() {
    // free calling of this function: this = global
    // if you call a function from an array: this = array
    console.log(this.length);
  }
  var obj = {
    length: 5,
    method: function(fn) {
      fn();
      // here this is arguments
      arguments[0]();
    }
  };
  // 10, 2
  obj.method(fn, 1);
}

function test21() {
  console.log((function f(n){return ((n > 1) ? n * f(n-1) : n);})(10));
}

function test20() {
  var a = {},
      b = {key: "x"},
      c = {key: "y"};

  /* type coercion here - a[b] -> a['[object Object]'] */
  a[b] = 123;
  /* this overwrites b */
  a[c] = 456;
  // 456
  console.log(a[b]);
}

function test19() {
  /* js weirdness: if true, the second one is returned */
  let a = 5 && 3;
  console.log(a);

  // 1
  console.log("0 || 1 = " + (0 || 1));
  // 1
  console.log("1 || 2 = " + (1 || 2));
  // 0
  console.log("0 && 1 = " + (0 && 1));
  // 2
  console.log("1 && 2 = " + (1 && 2));
}

function test18() {
  function func() {
    var a = 10;
    function innerFunc() {
      console.log(a);
    }
    return innerFunc;
  }
  let fcn = func();
  fcn();
}

function test17() {
  var list = [1, 2, 3];
  var nextItem = function() {
    var item = list.pop();
    console.log(item);
    if (item) {
      // this can cause stack overflow
      nextItem();

      // I think this will not
      //return nextItem();

      // apparently also this
      //setTimeout(nextItem, 0);
    }
    return undefined;
  };
  nextItem();
}

function test16() {
  // 122
  console.log(1 + "2" + "2");
  // 32 -> +"2" goes first - unary
  console.log(1 + +"2" + "2");
  // 02
  console.log(1 + -"1" + "2");
  // 112
  console.log(+"1" + "1" + "2");
  // NaN2
  console.log("A" - "B" + "2");
  // NaN
  console.log("A" - "B" + 2);
}

function test15() {
  // j, o, h, n
  var arr1 = "john".split("");
  // n, h, o, j; this makes arr1 the same
  var arr2 = arr1.reverse();
  // j o n e s
  var arr3 = "jones".split("");
  // n, h, o, j, [arr3]
  arr2.push(arr3);
  // 5, [j o n e s] slice(-1) = last element
  console.log(arr1.length + " " + arr1.slice(-1));
  // 5, ...
  console.log(arr2.length + " " + arr2.slice(-1));
}

function test14() {
  // this will store the keys in d
  var d = {};
  ["name1", "name2"].forEach(elem => {
    d[elem] = undefined;
  });
  console.log(d);

  // e.g.
  for (let key in d) {
    console.log(key);
  }
  // or
  console.log(Object.keys(d));
}

function test13() {
  /* this stores the address of i */
  let fcns = [];
  for (var i = 0; i < 5; i++) {
    fcns.push(function() {console.log(i);});
  }
  fcns[0]();

  let fcns2 = [];
  for (var j = 0; j < 5; j++) {
    /* you have to call it to save the value */
    fcns2.push(((n) => {
      return () => {
        console.log(n);
      };
    })(j));
  }
  fcns2[0]();

  /* or use forEach/let */
  let fcns3 = [];
  for (let i = 0; i < 5; i++) {
    fcns3.push(function() {console.log(i);});
  }
  fcns3[0]();
}

function test12() {
  function mySum(n1, n2) {
    if (typeof(n2) == "undefined")
      return (n) => (n1 + n);
    return n1 + n2;
  }
  console.log(mySum(2, 3));
  console.log(mySum(2)(3));
}

function test11() {
  /* test for palindrome */
  function func(s) {
    s = s.replace(/\W/g, "").toLowerCase();
    return s == s.split("").reverse().join("");
  }
  console.log(func("aas"));
  console.log(func("asa"));
  // this will remove non-words characters
  //console.log("Test#@@".replace(/\W/g, ""));
}

function test10() {
  (function() {
    console.log(1);
    setTimeout(function(){console.log(2);}, 1000);
    setTimeout(function(){console.log(3);}, 0);
    console.log(4);
  })();
  /* my ans - 1, 4, 3, 2 */
}

function test9() {
  /*
   * write isInteger
   * */
  function myInteger(x) {
    return Math.floor(x) == x;
  }
  let a = 8.2;
  console.log(myInteger(a));
  let b = 8;
  console.log(myInteger(b));
  // this works too
  console.log(myInteger(null));

  /* ES 6 */
  console.log(Number.isInteger(a));
  console.log(Number.isInteger(b));

  /*
   * official
   *   x XOR 0
   *   or like my above solution Math.round(), Math.ceil()
   * */
  function officialInteger(x) {
    // x XOR 0
    return (x ^ 0) === x;
  }

  // this prints 9
  console.log((9.2 ^ 0));
  console.log((9 ^ 0));

  /* official 2 - x % 1 === 0 */
  function officialInteger2(x) {
    return (typeof x === "number") && (x % 1) === 0;
  }
  console.log(officialInteger2(8.3));
  console.log(officialInteger2(8));

  /* incorrect solution */
  function incorrectInteger(x) {
    /*
     * this will use scientific notation if x is too larger
     * e.g. 1e+21
     * */
    return parseInt(x, 10) === x;
  }
}

function test8() {
  // this is 0.30000000000000004
  console.log(0.1 + 0.2);
  // this is false...
  console.log((0.1 + 0.2) == 0.3);
  // this is true
  console.log((1 + 2) == 3);

  /*
   * official:
   *   Numbers in js = floating point precision => upredictable
   *   the prev example - may or may not return true
   *   do the classic epsilon trick
   *
   * Number.EPSILON = 2.220446049250313e-16
   * */
  function myEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
  }
  console.log(myEqual(0.1 + 0.2, 0.3));
}

function test7() {
  /*
   * what is NaN? type? test for NaN?
   *   apparently it's a number - javascript primitive type
   *
   * official:
   *   value = "not a number"
   *   occurs when impossible to do op: "abc" / 4
   *   result of the operation is not numeric
   * */
  let obj = NaN;
  console.log(typeof(obj));
  console.log(Number.NaN);
  console.log(typeof(Number));

  console.log("abc" / 4);
  // this actually returns Infinity
  console.log(4 / 0);

  // this will return false
  console.log(NaN === NaN);

  // this will return true
  let tst = NaN;
  console.log(tst !== tst);

  // to test for NaN - Number.isNaN() - ES6
  console.log(Number.isNaN(NaN));
}

function test6() {
  function foo1()
  {
    return {
      bar: "hello"
    };
  }
  function foo2()
  {
    // this will append ; at end of line, so it returns undefined
    return
    {
      bar: "hello"
    };
  }
  console.log(foo1());
  console.log(foo2());
}

function test5() {
  /*
   * "use strict" - at the beginning of the file
   * enforces best practices?
   *
   * enforce stricter parsing and error handling
   *
   * makes debugging easier
   * prevents accidental globals
   * eliminates "this" coercion
   * disallows duplicate parameter values (in functions)
   *   function foo(val1, val2, val1)
   * makes eval() safer - variables and functions are not created
   *   in the containing scope - this doesn't seem the case??
   * throws error on invalid usage of delete
   * */

  /* examples of eval() - interprets js code (as string) */
  console.log(eval("2 + 2"));

  var a = 100;
  console.log(eval("a"));

  /*
   * types of properties
   *   writeable: false => can't be changed
   *   configurable: false => can't be deleted, can't change its attrs
   *   enumerable: true = can enumerate over
   *
   * changing attrs
   * */
  var foo = {};
  Object.defineProperty(foo, "bar", {
    value: 1,
    configurable: true,
    writable: true,
    enumerable: false
  });
  console.log(foo.bar);
  foo.bar = 10;
  console.log(foo.bar);

  Object.defineProperty(foo, "bar2", {
    value: 1,
    configurable: false,
    writable: false,
    enumerable: false
  });
  console.log(foo.bar2);
  // this has no effect; with "use strict" this will complain
  foo.bar2 = 2;
  console.log(foo.bar2);
}

function test4() {
  /*
   * wrapping entire js file in a function
   *   creating a closure for the file
   *     like creating a namespace - avoid same name vars
   *     avoid name clashes
   *   easy reference for the global in that file
   * */
}

function test3() {
  let obj = {
    foo: "bar",
    func() {
      var self = this;
      console.log(this.foo);
      console.log(self.foo);
      (function() {
        /*
         * here, this is undefined
         * type coercion will make it point to the global var
         * */
        console.log(this === global);
        console.log(this.foo);
        console.log(self.foo);
      }());
    }
  };
  obj.func();
}

function test2() {
  // IIFE = immediately invoked function expression
  (function(){
    /*
     * this is actually
     * b = 3 (global scope)
     * var a = b;
     * */
    var a = b = 3;
  })();
  console.log(typeof(a));
  console.log(typeof(b));

  /* the correct way to declare multiple variables */
  (function(){
    var c = 3,
        d = 3;
  })();
  console.log(typeof(c));
  console.log(typeof(d));
}

function test1() {
  /**
   * checking if something is an object
   * typeof(obj) === "object" is not enough
   * because null is object too
   */

  /* typeof(bar) === "object" */
  let obj = null;

  /* this will return true */
  console.log(typeof(obj) === "object");

  /* this will return false */
  console.log((obj !== null) && (typeof(obj) === "object"));

  /* special cases for functions and arrays */
}
