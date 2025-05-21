// cheatsheets https://www.typescriptlang.org/cheatsheets
var GrantType;
(function (GrantType) {
    GrantType["Otp"] = "otp";
    GrantType["Biometrics"] = "biometrics";
})(GrantType || (GrantType = {}));
//const g: GrantType = 'otp';
var g2 = GrantType.Otp;
console.log(g2 === 'otp');
process.exit();
// basic types
var city = 'LOL';
var price = 100;
var loading = true;
var user = { name: "lol", id: 0 };
// the following will throw errors
//const errorUser1: User = {};
//const errorUser2: User = { extra: "loll", name: "u2", id: 1 };
//const errorUser3: User = { name: true, id: 1 };
// you can also use this for classes with same variables
// you can also implement a type
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    // ts also adds visibility modifiers
    UserAccount.prototype.sayHi = function () {
        console.log('hi');
    };
    return UserAccount;
}());
var classUser = new UserAccount("Murphy", 1);
// types for functions
function getUser() {
    return { name: 'n', id: 10 };
}
var mb = "test";
// you can also use | for multiple types allowed
var m = "x";
// generics
var marr = [{ name: 'xxx' }];
var myBackpack = {
    item: "my item",
    add: function (obj) {
        console.log(obj);
    }
};
// you don't have to always declare type, but ts still checks
// some type coercion stuff -> structural/shape equivalence
// we can also use any for any type
var a = "alalaa";
// sometimes you want to help ts, makes sense when you have more specific types
var b = 10.6;
var c = 10.8;
// never type should be returned when the if case should never happen
// e.g. default branch in a switch statement
// other ways to define types on functions, e.g. when used as arguments
function wrapper1(fn) {
    fn("test");
}
function wrapper2(fn) {
    fn(10);
}
var MyDog = {
    name: "tim",
    makeSound: function () { console.log("bark"); }
};
var mPerson = { name: "xx" };
;
var MyCustomObject = { 'k1': 10, 'k2': 100 };
var mtt = ['ll', 10];
//const mtt2: MyTupleType = [10];
// with ts you can export types, interfaces
// you can import with `import type { ... } from "..."`
// you also have decorators
// ignoring next line
// @ts-ignore
