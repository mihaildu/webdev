/**
 * Test examples for jest
 */
const sum = require("./sum");

/* toBe tests for identity */
test("sum of 1, 2 should equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});

/* toEqual tests for equality */
test("objs should be same", () => {
    //expect({name: "myName"}).toBe({name: "myName"});
    expect({name: "myName"}).toEqual({name: "myName"});
});

/* toBe, toEqual = matchers */

/* you can also negate matchers with not */
test("2 + 3 != 7", () => {
    expect(sum(2, 3)).not.toBe(7);
});

/**
 * other matchers
 * toBeNull
 * toBeUndefined
 * toBeDefined
 * toBeTruthy - true
 * toBeFalsy - false
 *
 * you can also use multiple matchers in same test
 */
test("some other matchers", () => {
    expect(sum(2, 3)).toBeDefined();
    expect(sum(2, 3)).not.toBeNull();
});

/**
 * matchers for number comparison
 * toBeGreaterThan
 * toBeGreaterThanOrEqual
 * toBeLessThan
 * toBeLessThanOrEqual
 * toBeCloseTo - toEqual for floating point numbers
 *
 * strings
 * toMatch - reg expr
 */
test("string to match re", () => {
    expect("a").toMatch(/^a$/);
    expect("a").not.toMatch(/^b$/);
});

/**
 * arrays
 * toContain
 *
 * exceptions
 * toThrow
 */

function myThrow() {
    throw new Error("some error");
}

test("throw error", () => {
    // you can expect error type or message
    expect(myThrow).toThrow("some error");
});

/**
 * https://facebook.github.io/jest/docs/en/asynchronous.html
 */
