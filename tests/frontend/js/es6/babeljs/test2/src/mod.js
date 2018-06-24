/* a simple function that prints a message */
const test = (msg) => {
    console.log(msg);
};

/* this is an ES6 feature */
export default test;

/* exporting something that's not default */
const obj1 = 10, obj2 = 100;
export { obj1, obj2 };
