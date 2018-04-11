/**
 * Using GraphQL with apollo-server
 *
 * Docs starts at
 * https://www.apollographql.com/docs/apollo-server/
 *
 * API reference starts at
 * TODO
 */
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// defining the schema
const typeDefs = [`
    type Query {
        hello: String
    }
    schema {
        query: Query
    }
`];

// resolvers
const resolvers = {
    Query: {
        hello(root) {
            return "world";
        }
    }
};

// this is a graphql-tools thing
const schema = makeExecutableSchema({typeDefs, resolvers});

// graphql end point
app.use("/graphql", bodyParser.json(), graphqlExpress({schema}));

// graphiql
app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));

// start express server
app.listen(4000, () => console.log("Listening on port 4000"));
