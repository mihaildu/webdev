import React from "react";
import ReactDOM from "react-dom";

import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import {
    ApolloProvider,
    ApolloConsumer,
    Query,
    Mutation
} from "react-apollo";

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
    .then(res => {
        //console.log(res.data, res.data.hello);
    });

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
 * I guess in the Query render() function the children
 * function will be called
 * more on this in react render-props: (2nd option)
 * https://reactjs.org/docs/render-props.html
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

/* pre-define the query */
const GET_DOGS = gql`
    query dogs($breed: String!) {
        dogs(breed: $breed) {
            id,
            name,
            breed
        }
    }
`;

const GET_ALL_DOGS = gql`
query {
    dogs {
        id,
        name,
        breed
    }
}
`;

// this is for something else
client
    .query({
        query: GET_ALL_DOGS
        //variables: {breed: "Pitbull"}
    })
    .then(res => {
        //console.log(res.data.dogs);
    });

/**
 * you can pass multiple options to Query
 * variables: the variables to add to a pre-defined query
 *
 * TODO test this with mutations
 * pollInterval (ms) : by default apollo-client will cache the
 *   query result, so if you run the query again it will
 *   not get data from the server
 *   if you want fresh data - use pollInterval, which will
 *   cause a re-fetch (and re-render) on a set interval
 * startPolling, stopPolling: more control on polling
 * skip: ???
 *
 * notifyOnNetworkStatusChange: when we refetch data we can't
 *   use the loading variable anymore (since we might still
 *   want to display old data and not some loading message)
 *   to show that we are refetching (alongside old data)
 *   we can use networkStatus; this variable will make it re-render
 *   on networkStatus change
 *
 * errorPolicy: re-render when error was encountered
 *   by default it's set to "none" (which is false)
 *
 * more at
 * https://www.apollographql.com/docs/react/essentials/queries.html#props
 */
const Dogs = ({breed}) => (
    /* specifying variables in a defined query */
    <Query
       query={GET_DOGS}
       variables={{breed: breed}}
       //pollInterval={500}
       notifyOnNetworkStatusChange
       >
      {({loading, error, data, refetch, networkStatus}) => {
          /**
           * networkStatus values and their meanings at
           * https://www.apollographql.com/docs/react/api/react-apollo.html
           * #graphql-query-data-networkStatus
           */
          if (networkStatus === 4) return <p>Refetching</p>;
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error!</p>;
          let id = 0;
          /* data = {dogs: [{name, breed}]} */
          const dogs = data.dogs.map(dog => (
              <p key={id++}>
                This dog's name is {dog.name} and breed {dog.breed}
              </p>
          ));
          /**
           * you can also force a refetch like so
           * this will cause a re-render, so this entire function
           * is called again
           */
          return (
              <div>
                {dogs}
                <button onClick={() => refetch()}>Refetch data</button>
              </div>
          );
      }}
    </Query>
);

const App3 = () => (
    <ApolloProvider client={client}>
      <Dogs breed="Pitbull" />
    </ApolloProvider>
);

/**
 * if you don't want to run a query when you render the component
 * you have to use something different than Query
 * you can use the client.query directly
 *
 * to get the client from context (instead of doing this yourself)
 * you can use ApolloConsumer - this will retrive client
 * from ctx so you can use it
 */
const GET_HELLO = gql`
    query {
        hello
    }
`;

const Hello = () => (
    <ApolloConsumer>
      {client => {
          /**
           * we have access to the client here
           * so we can do queries and stuff
           */
          function queryHello() {
              client
                  .query({query: GET_HELLO})
                  .then(res => console.log(res.data));
          }
          return (
              <button onClick={queryHello}>
                Query hello
              </button>
          );
      }}
    </ApolloConsumer>
);

const App4 = () => (
    <ApolloProvider client={client}>
      <Hello />
    </ApolloProvider>
);

/**
 * so the mutation returns the newly added element in data
 * if the mutations was not with success then data is null
 * and there is a new field - errors: [message: "", locations: []]
 */
const ADD_DOG = gql`
  mutation addDog($name: String!, $breed: String) {
    addDog(name: $name, breed: $breed) {
      id
      name,
      breed
    }
  }
`;

const AddDogs = () => {
    function handleClick() {
        // prob a better way to do this
        // get input values
        // do a post with a mutation
    }
    let dogName, dogBreed;
    return (
        /**
         * first arg = mutate function
         *   this takes can take args of
         *   variables, optimisticResponse, refetchQueries, update
         * second = {data, loading, called, error}
         *   this has results from the query (e.g. what you get when
         *   you run a mutation in graphiql); so this gets re-rendered too
         *
         * when you run a mutation it won't automatically update the local cache
         * of data, so you need to use update param if that's the case
         * (some times you don't need to, so I guess it's more optimal to manually
         * specify when that's the case)
         *
         * TODO - test this - if you update some object that has some id
         * (e.g. a Dog) with new info - it might update locally too
         *
         * first arg = local cache
         * second arg = mutation result
         */
        <Mutation
           mutation={ADD_DOG}
           update={(cache, result) => {
               /**
                * result will just copy the mutation structure
                * {data: {addDog: {name, breed}}}
                */
               const res = cache.readQuery({ query: GET_ALL_DOGS });
               // this doesn't have the newly added dog
               console.log(res);
               /**
                * one way to overcome this: add item to local cache
                * (re-implementation)
                *
                * TODO fix this & read doc
                * TODO continue apollo doc from here
                */
               /* cache.writeQuery({ */
               /*     query: GET_ALL_DOGS, */
               /*     data: { dogs: res.dogs.concat([result.addDog]) } */
               /* }); */
               /* console.log(cache); */
          }}>
          {(addDog, {data}) => {
              //console.log(data);
              return (
                  <div>
                    <form onSubmit={e => {
                          e.preventDefault();
                          addDog({variables: {
                              name: dogName.value,
                              breed: dogBreed.value
                          }});
                          dogName.value = "";
                          dogBreed.value = "";
                      }} >
                      <input type="text"
                             ref={node => {dogName = node;}} size="20"
                        placeholder="Dog's name"
                        />
                        <input type="text"
                               ref={node => {dogBreed = node;}} size="20"
                          placeholder="Dog's breed"
                          />
                          <button type="submit">Add dog</button>
                    </form>
                  </div>
              );
          }}
        </Mutation>
    );
};

const App5 = () => (
    <ApolloProvider client={client}>
      <AddDogs />
    </ApolloProvider>
);

ReactDOM.render(
    <App5 />,
    document.getElementById("root")
);
