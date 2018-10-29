/**
 * Using subscriptions in GraphQL
 */

import React from "react";
import ReactDOM from "react-dom";

import gql from "graphql-tag";
import {
  ApolloProvider,
  ApolloConsumer,
  Query,
  Mutation,
  Subscription
} from "react-apollo";

/**
 * Instead of using ApolloClient from apollo-boost
 * we are going to use it from apollo-client
 *
 * this seems to allow for better customization
 */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache()
});

/* testing if it worked */
const App = () => {
    return (
        <ApolloProvider client={client}>
          <p>Hello</p>
        </ApolloProvider>
    );
};

/* hello query */
const GET_HELLO = gql`
    query {
        hello
    }
`;

const App2 = () => {
  return (
    <ApolloProvider client={client}>
      <Query query={GET_HELLO}>
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error!</p>;
          return <p>{data.hello}</p>
        }}
      </Query>
    </ApolloProvider>
  );
};

/* using http link + ws link */
import { WebSocketLink } from 'apollo-link-ws';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/subscriptions`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client2 = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App3 = () => {
    return (
        <ApolloProvider client={client2}>
          <p>Hello</p>
        </ApolloProvider>
    );
};

const ON_NEW_SERVER_EVENT = gql`
    subscription onNewServerEvent {
        newServerEvent
    }
`;

// data: { newServerEvent }
const App4 = () => {
  return (
    <ApolloProvider client={client2}>
      <Subscription subscription={ON_NEW_SERVER_EVENT}>
        {({ data, loading }) => {
          console.log("got new event: ", data);
          if (loading) {
            return <p>Loading...</p>;
          }
          return (
            <p>Cnt is: {!loading && data.newServerEvent}</p>
          )
        }}
      </Subscription>
    </ApolloProvider>
  );
};

/* client2.subscribe({ */
/*   query: ON_NEW_SERVER_EVENT */
/* }).subscribe({ */
/*   next (data) { */
/*     console.log(data); */
/*   } */
/* }); */

ReactDOM.render(
    <App4 />,
    document.getElementById("root")
);
