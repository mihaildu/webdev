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
 * testing async functions
 */
function fetchData(callback) {
    setTimeout(() => {
        callback(10);
    }, 1000);
}

test("fetch data returns 10", done => {
    function fcn(data) {
        expect(data).toBe(10);
        done();
    }
    /**
     * run async function, test for result when done
     * normally a test finish when the test() function finishes
     * so it doesn't wait for callback
     *
     * use a 'done' param to the test to force test to wait
     */
    fetchData(fcn);
});

/**
 * jest is friendlier with promises
 * you just need to return them
 */
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100);
        }, 1000);
    });
}

test("fetchDataPromise returns 100", () => {
    /**
     * this is also needed in case both resolve and reject
     * run? so if more/less than the number of assertions
     * are used in the test, then it fails
     *
     * assertions = expect() calls in test
     */
    expect.assertions(1);

    return fetchDataPromise().then(data => {
        expect(data).toBe(100);
    });
    /**
     * reject() will fail the test
     * if the promise should fail/reject,
     * use expect in catch()
     */
});

test("fetchDataPromise returns 100, test 2", () => {
    /**
     * you can also use resolves/rejects for promises
     */
    expect.assertions(1);
    return expect(fetchDataPromise()).resolves.toBe(100);
    //return expect(fetchDataPromise()).rejects.toMatch("error");
});


test("fetchDataPromise returns 100, test 3", async () => {
    /**
     * you can also use async/await for promises
     */
    expect.assertions(1);
    const data = await fetchDataPromise();
    expect(data).toBe(100);
});

function fetchDataError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("big error");
        }, 1000);
    });
}

test("fetchDataError throws error", async () => {
    expect.assertions(1);
    try {
        await fetchDataError();
    } catch(e) {
        expect(e).toMatch("big error");
    }
});

/**
 * sometimes you want to run some initializers before tests
 * you can do that in a bunch of functions in jest
 * beforeAll(), afterAll() - all tests in file
 * beforeEach(), afterEach() - before/after each test in file
 */
beforeAll(() => {
    console.log("this runs once before all tests");
    // e.g. initDatabase()
});

afterAll(() => {
    console.log("this runs once after all tests");
});

/**
 * jest will first parse the file and register all tests
 * and all other special functions, so it doesn't matter
 * where you define beforeAll/afterAll etc, they will
 * be run at the right time
 */

/* beforeEach(() => { */
/*     console.log("before each"); */
/* }); */

/**
 * maybe we want to run some init before certain tests only
 * we can move them to a different file or put them in a special
 * block with describe()
 *
 * code inside describe() block will be run before all tests run
 * since they are registered first
 */
describe("tests that use food data", () => {
    //console.log("this runs before any test");
    beforeAll(() => {
        console.log("this only runs before all tests in this block");
    });
    test("some food test", () => {
        const strawberryColor = "red";
        expect(strawberryColor).toBe("red");
    });
});

/**
 * if you want to run only one test in a file
 * use .only() and other ones will be ignored
 *
 * if you want the test to be skipped, use .skip() instead
 * you can use these on describe areas too
 */
/* test.only("only test that runs in this file", () => { */
/*     expect(true).toBe(true); */
/* }); */

/* TODO */
test("mock a function", () => {
    /**
     * some forEach implementation
     * we want to test it is indeed called for each element
     */
    function myForEach(items, callback) {
        for (let index = 0; index < items.length; index++) {
            callback(items[index]);
        }
    }

    /**
     * this is a mock function - that doesn't do anything
     * but provides us with stats
     */
    const fcnMock = jest.fn();

    /* now we call fcnMock on each element */
    myForEach([1, 2, 3], fcnMock);

    /* and check if it was called on each item */
    expect(fcnMock.mock.calls.length).toBe(3);

    /* first function call, first argument = 1 */
    expect(fcnMock.mock.calls[0][0]).toBe(1);

    /**
     * mock.instances = array with values for this
     * e.g. you can check how many times an object
     * was instantiated: mock.instances.length
     */

    /**
     * you can also mock/specify the behaviour of the function
     */
    const fcnMock2 = jest.fn();
    // undefined
    console.log(fcnMock2());

    fcnMock2
        .mockReturnValueOnce(1)
        .mockReturnValueOnce("str")
        .mockReturnValue(true);

    console.log(fcnMock2(), fcnMock2(), fcnMock2(), fcnMock2());
});

/**
 * you can also mock modules
 * jest.mock("module")
 * then mock functions from that module (e.g. get, set etc)
 */

/**
 * you can also implement mock functions if you want
 * jest.fn(...implementation)
 * or with mock.mockImplementationOnce (just once)
 * you also have mock.mockImplementation
 *
 * you can mock the name of the function with .mockName("name")
 */
const fcnMock3 = jest.fn()
          .mockImplementationOnce(() => {return 10;})
          .mockImplementationOnce(() => {return 100;});

console.log(fcnMock3(), fcnMock3());

test("custom matchers for mock objects", () => {
    /**
     * so mock objects have custom matchers in expect calls
     */
    const fcnMock4 = jest.fn();

    /* call it at least once */
    fcnMock4();
    expect(fcnMock4).toBeCalled();

    /**
     * other special matchers:
     * toBeCalledWith(), lastCalledWith(), toMatchSnapshot()
     */
});
