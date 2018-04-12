/**
 * to run this
 * node index.js
 */
let {graphql, buildSchema}  = require("graphql");

// schema for what you can query
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// resolver function for each API endpoint???
let root = {
    hello: () => {
        return "Hello world!";
    }
};

/**
 * we want hello from root??
 */
graphql(schema, '{hello}', root).then((response) => {
    console.log(response);
});
