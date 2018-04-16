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

/**
 * use cors to make it work on localhost
 * so this actually works...
 * you can also use it for specific routes
 * https://www.npmjs.com/package/cors
 */
const cors = require("cors");
app.use(cors());

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

const dogData = [
    {
        id: "dlsakdjasda",
        name: "Tim",
        breed: "Chihuahua"
    },
    {
        id: "ldksjada",
        name: "Tom",
        breed: "Pitbull"
    }
];

/**
 * types for the schema
 * the last type (schema) is optional
 */
const typeDefs = [`
    type Query {
        hello: String,
        people: [Human],
        dogs(breed: String): [Dog],
    }
    type Human {
        name: String,
        age: Int
    }
    type Dog {
        id: ID!,
        name: String,
        breed: String
    }
    type Mutation {
        addDog(name: String!, breed: String): Dog!
    }
    schema {
        query: Query,
        mutation: Mutation
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
        },
        dogs(root, {breed}, context) {
            if (typeof(breed) == "undefined")
                return dogData;
            return dogData.filter(dog => dog.breed == breed);
        }
    },
    Mutation: {
        addDog(root, {name, breed}, context) {
            const newDog = {id: Math.random().toString(), name, breed};
            dogData.forEach(dog => {
                console.log(dog.name);
                if (dog.name === name) {
                    throw new Error("Dog already exists");
                }
            });
            dogData.push(newDog);
            return newDog;
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
            /**
             * you can enable tracing & cache control
             * both of these are for apollo engine only
             * they will get removed when sent back to client
             */
            tracing: true,
            cacheControl: true
        };
    })
);

// graphiql
app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));

// start express server
app.listen(4000, () => console.log("Listening on port 4000"));
