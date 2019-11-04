const { buildSchema } = require("graphql");
const express = require("express");
const graphqlHTTP = require("express-graphql");

const cors = require("cors");

const app = express();
const PORT = 3000;

const users = {
  '1': {
    id: 1,
    name: 'First User',
    email: 'firstuser@mail.com'
  },
  '2' : {
    id: 2,
    name: 'Second User',
    email: 'seconduser@mail.com'
  }
};

const schema = buildSchema(`
  type User {
    id: Int,
    name: String,
    email: String
  }
  input UserInput {
    name: String,
    email: String
  }
  type Query {
    users: [User],
    user(id: Int!): User,
    usersFiltered(ids: [Int]!): [User]
  }
  type Mutation {
    createUser(user: UserInput!): User,
    updateUser(id: Int!, user: UserInput!): User,
    deleteUser(id: Int!): Int
  }
`);

const resolvers = {
  users: () => {
    return Object.values(users);
  },
  user: ({ id }) => {
    return users[id];
  },
  usersFiltered: ({ ids }) => {
    return Object.values(users).filter(user => ids.includes(user.id));
  },
  createUser: ({ user }) => {
    const userIds = Object.keys(users);
    const newId = String(Number(userIds[userIds.length - 1]) + 1);
    const newUser = {
      id: newId,
      ...user
    };

    users[newId] = newUser;
    return newUser;
  },
  updateUser: ({ id, user }) => {
    const requestedUser = users[id];
    if (!requestedUser) {
      return null;
    }

    const newUser = {
      ...requestedUser,
      ...user,
    };

    users[id] = newUser;
    return newUser;
  },
  deleteUser: ({ id }) => {
    if (!users[id]) {
      return null;
    }

    delete users[id];
    return id;
  }
};

// this has to be before graphql
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(PORT);
console.log("GraphQL API on localhost:3000/graphql");
