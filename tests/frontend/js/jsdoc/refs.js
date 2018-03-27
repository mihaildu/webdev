/**
 * Examples of jsdoc comments
 * http://usejsdoc.org/
 *
 * You should be able to run jsdoc on this file to generate docs
 */

function main() {
    console.log("hello");
}

/**
 * This is documentation for fcn1()
 * you can add special @ tags to describe the function
 * like params + types
 * all tags on official webpage under "block tags"
 *
 * @param {string} param1 - First parameter, it's a string!
 * @param {object} param2 - Second parameter, it's an object!
 * @returns {number} - sum of 1 + 2
 */
function fcn1(param1, param2) {
    console.log(param1, param2);
    return 1 + 2;
}

main();
