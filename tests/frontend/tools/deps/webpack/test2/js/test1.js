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
import Joi from "joi";
//const Joi = require("joi");

import { fileFn } from "./export2";

import fcn4 from "./export3";

main();

function main() {
  test14_import2();
  //test13_export();
  //test12_joi_or();
  //test11_joi_when();
  //test10_joi();
  //test9_humps();
  //test8_import_vars();
  //test7_componse();
  //test6();
  //test5_iterators();
  //test4();
  //test3();
  //test2();
  //test1();
}

function test14_import2() {
  fcn4.val = 20;
  console.log(fcn4);
}

function test13_export() {
  fileFn();
}

function test12_joi1() {
  const manuscript = {
    "type": "manuscript",
    "files": [
      {
        "url": "uploads/20223827-e6e1-486a-a4a0-ca82bf959cc3/0f8a31a4a4e2b79a29b9592153680f14.pdf",
        "name": "Deliveroo___Status___Order_5620.pdf",
        "type": "MANUSCRIPT_SOURCE"
      }
    ],
    "title": "lkdla",
    "subjectAreas": [
      "cancer-biology"
    ],
    "manuscriptType":"research-article",
    "submissionMeta":
    {
      "stage": "QA",
      "author":
      {
        "email": "elife@mailinator.com",
        "lastName": "User",
        "firstName": "",
        "institution": "University of eLife"
      },
      "createdBy": "59afaaee-fdfa-4be2-b35b-fbefad46b74d",
      "discussion": "",
      "coverLetter": "<p>ddddd</p>",
      "cosubmission": false,
      "correspondent":
      {
        "email": "",
        "lastName": "",
        "firstName": "",
        "institution": ""
      },
      "cosubmissionId": "",
      "previousArticle": "",
      "hasCorrespondent": false,
      "cosubmissionTitle": "",
      "discussedPreviously": false,
      "consideredPreviously": false
    },
    "opposedReviewers": [],
    "suggestedReviewers": [
      {
        "name": "odijsaodija",
        "email": "oijdsaodisja@mail.com"
      },
      {
        "name": "osijaoidjad",
        "email": "oijsoidja@mail.com"
      },
      {
        "name": "oidjoaidjsad",
        "email": "oijoifjs@mail.com"
      }],
    "noConflictOfInterest": true,
    "opposedSeniorEditors": [],
    "suggestedSeniorEditors": ["kajdlkajdal", "oijsoaijda"],
    "opposedReviewingEditors": [],
    "suggestedReviewingEditors": ["odisjad", "oijsoidaj@mail.com"]
  }
}

function test12_joi_or() {
  /**
   * testing or in joi
   * when a is true, we need either b or c
   * when a is false we don't care
   */
  const tests = [
    {
      a: true,
      b: "lol1",
      c: "lol2"
    },
    {
      a: true,
      b: "lol1"
    },
    {
      a: true,
      c: "lol2"
    },
    {
      a: false,
      b: "lol1",
      c: "lol2"
    },
    {
      a: false
    },
    {
      a: false,
      b: "lol1"
    },
    {
      a: false,
      c: "lol2"
    },
    /* { */
    /*   a: true */
    /* } */
  ];

  const schema = Joi.object().keys({
    a: Joi.boolean(),
    b: Joi.string(),
    c: Joi.string()
  }).or("b", "c");

  /* const schema7 = Joi.object().keys({ */
  /*   a: Joi.boolean(), */
  /*   b: Joi.string(), */
  /*   c: Joi.string() */
  /* }).when("a", { */
  /*   is: true, */
  /*   then: Joi.or("b", "c") */
  /* }); */

  const schema2 = Joi.alternatives().try(
    Joi.object().keys({
      a: Joi.boolean().required(),
      b: Joi.string().when("a", {
        is: true,
        then: Joi.required()
      }),
      c: Joi.string()
    }),
    Joi.object().keys({
      a: Joi.boolean().required(),
      b: Joi.string(),
      c: Joi.string().when("a", {
        is: true,
        then: Joi.required()
      })
    })
  );

  test11_test_schema(tests, schema);
  return;

  /* extending schema 2 */
  const schema3 = schema2.keys({
    d: Joi.number().required()
  });
  const {error: err10} = Joi.validate({d: 100}, schema3);
  console.log(err10);
  return;
}

function test11_test_schema(tests, schema) {
  tests.forEach((test, index) => {
    const {error} = Joi.validate(test, schema);
    console.log("error " + index, error);
  })
}

function test11_joi_when() {
  /* testing when in joi */
  const schema = {
    a: Joi.boolean(),
    b: Joi.when("a", {
      is: true,
      then: Joi.string().required()
      /* I guess optional is implicit in Joi */
      //otherwise: Joi.optional()
    })
  };
  const {error, value} = Joi.validate({a: true, b: "lol"}, schema);
  console.log(error);
}

function test10_joi() {
  /**
   * Joi is this object scheme/key validation
   * https://github.com/hapijs/joi
   *
   * To make it work with webpack, add this to webpack.config
   * node: {
   *   net: "empty",
   * }
   */

  /* first, define a schema */
  const schema = {
    username: Joi.string()
  };

  /**
   * then validate something against it
   * the error is null if input ok
   * otherwise it's an error object
   */
  const {error, value} = Joi.validate({username: "User1"}, schema);
  console.log(error);
  console.log(Joi.validate({username: 100}, schema).error);

  const schema2 = {
    username: Joi.string(),
    password: Joi.string(),
    age: Joi.number(),
    child: Joi.object()
  };
  const obj2 = {
    username: "user2",
    password: "user2",
    age: 10,
    child: {}
  };
  console.log(Joi.validate(obj2, schema2).error);

  /**
   * however, this still passes is prop is not defined
   * to force the existence of props use .required()
   */
  const schema3 = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  const obj3 = {
    username: "username3",
  }
  console.log(Joi.validate(obj3, schema3).error);

  const obj4 = {
    username: "user4",
    password: "pss4",
    other: "extra"
  }
  console.log(Joi.validate(obj4, schema3).error);

  /* validating arrays */
  const schema4 = Joi.array().items(Joi.string()).required();
  const obj5 = ["sda", "dsada"];
  //const obj5 = ["test", ""];
  //const obj5 = undefined;
  console.log(Joi.validate(obj5, schema4).error);

  /**
   * to force a value to be in a list use valid(value 1, value 2, ...)
   */
  const schema5 = Joi.string().valid("value 1", "value 2");
  console.log(Joi.validate("value 1", schema5).error);
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
