import React from "react";
import ReactDOM from "react-dom";

import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

/* first, create a client */
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

/**
 * now we can send queries
 * this is the same format from GraphQL/GraphiQL
 * the returned data will have same structure as the query
 */
client
    .query({
        query: gql`
        {
            hello
        }`
    })
    .then(res => console.log(res.data, res.data.hello));

/**
 * you can pass down the client object in your react app
 * using ApolloProvider, which I assume uses React context for this
 */
const App = () => {
    return (
        <ApolloProvider client={client}>
          <p>sup</p>
        </ApolloProvider>
    );
};

/**
 * if you want to use data from a query in a component you can
 * use the Query component first from react-apollo
 */
const People = () => (
    <Query
       query={gql`
       {
           people
           {
               name
           }
       }`}
       >
      {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error!</p>;
          // data.people = list of Human types
          let id = 0;
          const people = data.people.map(human => (
              <p key={id++}>
                Hello my name is {human.name}
              </p>
          ));
          return people;
      }}
    </Query>
);

const App2 = () => {
    return (
        <ApolloProvider client={client}>
          <People />
        </ApolloProvider>
    );
};

ReactDOM.render(
    <App2 />,
    document.getElementById("root")
);
