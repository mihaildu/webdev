/**
 * Using GraphQL with express/node.js
 *
 * Docs starts at
 * http://graphql.org/graphql-js/
 *
 * API reference starts at
 * http://graphql.org/graphql-js/express-graphql/
 */

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
 *
 * for api endpoints that change data - define mutations instead
 * there's no difference between queries and mutations, it's just
 * for better organizing your code
 * also, apparently mutations run in series and queries are
 * executed in parallel
 *
 * for custom types that will be used as input you can use
 * input instead of type; this will force the type to not
 * be nested
 * for input types you don't have to define an object/class
 * all args will be available as if you used multiple inputs
 */
const {
    buildSchema,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require("graphql");
const graphqlHTTP = require("express-graphql");
const schema = buildSchema(`
    input MessageInput {
        content: String,
        author: String
    }
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
        returnMyType(arg: Int): MyType,
        getMessage: String,
        setMessage2(message: String!): String,
        printInputType(arg: MessageInput): String,
        showIp: String
    }
    type Mutation {
        setMessage(message: String!): String
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

let serverMessage = "";

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
    },
    getMessage: () => {
        return serverMessage;
    },
    setMessage: ({message}) => {
        serverMessage = message;
        return serverMessage;
    },
    setMessage2: ({message}) => {
        serverMessage = message;
        return serverMessage;
    },
    printInputType: ({arg}) => {
        return arg.content + " " + arg.author;
    },
    /* you can access request object as second param */
    showIp: (args, request) => {
        return request.ip;
    }
};

/**
 * instead of using buildSchema with a template string
 * you can also define it dynamically with graphql.GraphQLSchema()
 * for this you have to define your types with GraphQLObjectType
 *
 * for built-in types you have GraphQLString etc
 * http://graphql.org/graphql-js/type/#scalars
 * for your own types just use the object returned by GraphQLObjectType
 *
 * more on how to fill custom object types
 * http://graphql.org/graphql-js/type/#graphqlobjecttype
 */
const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        hello: {
            type: GraphQLString,
            args: {},
            /**
             * I assume they use the one with same name from root
             * when you use buildSchema
             */
            resolve: () => {
                return "Hello World";
            }
        }
    }
});

/**
 * you can add mutations in a similar way
 * GraphQLSchema({query, mutation})
 * http://graphql.org/graphql-js/type/#graphqlschema
 */
const dynamicSchema = new GraphQLSchema({query: queryType});

/**
 * graphql-js is some middleware
 * GraphiQL is some tool to test queries
 * if you go to /graphql in browser you should see the UI
 * also https://github.com/graphql/graphiql
 *
 * this graphql middleware will look for a "query" field
 * in the json you send (payload)
 */

/* app.use("/graphql", graphqlHTTP({ */
/*     schema: schema, */
/*     rootValue: root, */
/*     graphiql: true */
/* })); */

// adding cors (e.g. when accessing a website via apache -> graphql for queries)
// this middleware has to be applied before /graphql
const cors = require("cors");
// these are optional, by default everything is allowed
const corsOptions = {
  origin: 'http://127.0.0.1',
  credentials: false
};

app.use(cors(corsOptions));

/**
 * you can change the context (e.g. to add a db)
 * the function call is
 * graphqlHTTP({schema, graphiql, rootValue,
 *   context, pretty, formatError, validationRules})
 */
app.use("/graphql", graphqlHTTP({
    schema: dynamicSchema,
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
