/**
 * Using GraphQL with apollo-server
 *
 * Docs starts at
 * https://www.apollographql.com/docs/apollo-server/
 *
 * Github
 * https://github.com/apollographql/apollo-server
 *
 * API reference starts at
 * TODO
 */
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

/* some data */
const peopleData = [
    {
        name: "Jim",
        age: 10
    },
    {
        name: "John",
        age: 90
    }
];

/**
 * types for the schema
 * the last type (schema) is optional
 */
const typeDefs = [`
    type Query {
        hello: String,
        people: [Human]
    }
    type Human {
        name: String,
        age: Int
    }
    schema {
        query: Query
    }
`];

/**
 * resolvers
 * resolver prototype: (root, args, context, ???)
 * root = ???
 * args = args to query
 * context = initialized on connection
 */
const resolvers = {
    Query: {
        hello(root, args, context) {
            console.log(root);
            console.log(args);
            console.log(context);
            return "world";
        },
        people(root, args, context) {
            return peopleData;
        }
    }
};

/**
 * build the graphql schema
 * you can use graphql-tools or graphql-js (app.js)
 */
const schema = makeExecutableSchema({typeDefs, resolvers});

/**
 * graphql end point
 * you can add options after graphqlExpress as GraphQLOptions
 * https://www.apollographql.com/docs/apollo-server/setup.html#graphqlOptions
 * or you can return them in a function in graphqlExpress
 */
app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress(req => {
        return {
            schema,
            // this is data per req/user
            context: {
                ip: req.ip
            },
            // you can enable tracing & cache control
            tracing: true,
            cacheControl: true
        };
    })
);

// graphiql
app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));

// start express server
app.listen(4000, () => console.log("Listening on port 4000"));
