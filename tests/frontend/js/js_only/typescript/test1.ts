// basic types
const city: string = 'LOL';
const price: number = 100;
const loading: boolean = true;

// interfaces for objects
interface User {
  name: string;
  id: number;
}

const user: User = { name: "lol", id: 0 };
// the following will throw errors
//const errorUser1: User = {};
//const errorUser2: User = { extra: "loll", name: "u2", id: 1 };
//const errorUser3: User = { name: true, id: 1 };

// you can also use this for classes with same variables
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
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
