// cheatsheets https://www.typescriptlang.org/cheatsheets

// basic types
const city: string = 'LOL';
const price: number = 100;
const loading: boolean = true;

// interfaces for objects
interface User {
  name: string;
  id: number;
  // optional props with ?
  age?: number;
}

const user: User = { name: "lol", id: 0 };
// the following will throw errors
//const errorUser1: User = {};
//const errorUser2: User = { extra: "loll", name: "u2", id: 1 };
//const errorUser3: User = { name: true, id: 1 };

// you can also use this for classes with same variables
// you can also implement a type
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }

  // ts also adds visibility modifiers
  public sayHi(): void {
    console.log('hi');
  }

  // you can also use protected, private
  // default modifier is public
  // you can also do it on static variables
  // you can also have abstract classes & members (no implementation)
}

const classUser: User = new UserAccount("Murphy", 1);

// types for functions
function getUser(): User {
  return { name: 'n', id: 10 };
}

// unions - only list of values allowed
type MyBool = true | "test";
const mb: MyBool = "test";

// you can also use | for multiple types allowed
const m: string | string[] = "x";

// generics
const marr: Array<{ name: string }> = [{ name: 'xxx' }];

// you can also do cpp template stuff
// sometimes these types are automatically inferred from data
interface Backpack<Type> {
  item: Type;
  add: (obj: Type) => void;
}

const myBackpack: Backpack<string> = {
  item: "my item",
  add: function(obj: string) {
    console.log(obj);
  }
};

// you don't have to always declare type, but ts still checks
// some type coercion stuff -> structural/shape equivalence

// we can also use any for any type
const a: any = "alalaa";

// sometimes you want to help ts, makes sense when you have more specific types
const b: number = 10.6 as number;

const c: number = <number>10.8;

// never type should be returned when the if case should never happen
// e.g. default branch in a switch statement

// other ways to define types on functions, e.g. when used as arguments
function wrapper1(fn: (a: string) => void) {
  fn("test");
}

// function types can also be objects with a callable type
type DescribableFunction = {
  description: string;
  (arg: number): boolean; // callable type
};

function wrapper2(fn: DescribableFunction) {
  fn(10);
}

// ctor types
// type MyCtor = {
//   new (s: string): SomeObject;
// };
// new MyCtor(string)

// you can extend types
interface Animal {
  name: string;
}

interface Dog extends Animal {
  makeSound: () => void;
}

const MyDog: Dog = {
  name: "tim",
  makeSound: () => { console.log("bark"); }
};

// you can overload functions

// you can have modifiers on object types
// you can assign a value when declaring
interface Person {
  readonly name: string;
}

const mPerson: Person = { name: "xx" };

// sometimes you want to restrict the keys on objects
interface CustomObject {
  [index: string]: number;
};

const MyCustomObject: CustomObject = { 'k1': 10, 'k2': 100 };
// this fails
//const MyCustomObject2: CustomObject = { 1: 'xx' };

// intersecting types
interface T1 {
  color: string;
}

interface T2 {
  radius: number;
}

type T3 = T1 & T2;

// unknown = like any, but same type always

// tuple type
type MyTupleType = [string, number];
const mtt: MyTupleType = ['ll', 10];
//const mtt2: MyTupleType = [10];

// with ts you can export types, interfaces
// you can import with `import type { ... } from "..."`
// you also have decorators

// ignoring next line
// @ts-ignore
