/* normal express app */
const express = require("express");
const app = express();

/**
 * build the schema
 *
 * when you run a query you specify what you want
 * like so
 * {
 *   hello
 * }
 *
 * from root - only hello entry
 *
 * for more types
 * https://graphql.org/learn/schema/
 *
 * exclamation mark = required/non-nullable
 * if you return something with ! = it will always be returned
 *
 * you can also have queries with params
 *
 * we can also return custom types (e.g. if we want to return objects)
 * for this we need to first define it in the schema
 * then we can return the object in the root resolver
 *
 * when you define the type you should specify all props on obj
 */
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const schema = buildSchema(`
    type MyType {
        arg: Int,
        getArg: Int,
        inc(someNumber: Int): Int
    }
    type Query {
        hello: String,
        number: Int,
        returnNumber(num: Int!, secret: String!): String!,
        returnList(arg1: Int, arg2: Int): [Int],
        returnMyType(arg: Int): MyType
    }
`);

/* defining my own type */
class MyType {
    constructor(arg) {
        this.arg = arg;
    }
    getArg() {
        return this.arg;
    }
    inc({someNumber}) {
        return someNumber + 1;
    }
}

/* root resolver */
const root = {
    hello: () => {
        return "Hello world";
    },
    number: () => {
        return 10;
    },
    /**
     * args will have all params
     */
    returnNumber: (args) => {
        console.log(args);
        return "Your number is " + args.num + " and your secret is " +
            args.secret;
    },
    /* you can also use destructuring */
    returnList: ({arg1, arg2}) => {
        console.log(arg1, arg2);
        return [1, 2, 3];
    },
    returnMyType: ({arg}) => {
        return new MyType(arg);
    }
};

/**
 * graphql-js is some middleware
 * GraphiQL is some tool to test queries
 * if you go to /graphql in browser you should see the UI
 * also https://github.com/graphql/graphiql
 *
 * this graphql middleware will look for a "query" field
 * in the json you send (payload)
 */
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

/* doing the graphql from the client side */
app.get(["/", "/index", "/index.html"], function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/"));

/* start server */
app.listen(4000);

console.log("GraphQL API on localhost:4000/graphql");
