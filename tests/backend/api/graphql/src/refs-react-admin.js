import React from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

import { Admin, Resource, Delete } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql';

import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  DisabledInput,
  TextInput
} from 'react-admin';

function queryGraphql() {
  const client = new ApolloClient({
    uri: "http://127.0.0.1:3000/graphql"
  });
  client
    .query({
      query: gql`
        {
            hello
        }`
    })
    .then(res => {
      console.log(res.data);
    });
}

const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>Post {record ? `"${record.name}"` : ''}</span>;
};

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

const UserCreate = (props) => (
  <Create title="Create an User" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);

const handleUserAction = (action, params) => {
  const handleGetList = params => ({
    query: gql`query {
      users {
        id,
        name,
        email
      }
    }`,
    variables: params,
    parseResponse: response => ({
      data: response.data.users,
      total: response.data.users.length
    })
  });

  const handleGetOne = params => ({
    query: gql`query getUser($id: Int!) {
      user(id: $id) {
        id,
        name,
        email
      }
    }`,
    variables: params,
    parseResponse: response => ({
      data: response.data.user,
    })
  });

  const handleUpdate = params => ({
    query: gql`mutation updateUser($id: Int!, $user: UserInput!) {
      updateUser(id: $id, user: $user) {
        id,
        name,
        email
      }
    }`,
    // TODO probably nicer way to get rid of id
    variables: {
      id: params.id,
      user: {
        name: params.data.name,
        email: params.data.email
      }
    },
    parseResponse: response => ({
      data: response.data.updateUser,
    })
  });

  const handleCreate = params => ({
    query: gql`mutation createUser($user: UserInput!) {
      createUser(user: $user) {
        id,
        name,
        email
      }
    }`,
    variables: {
      user: {
        name: params.data.name,
        email: params.data.email
      }
    },
    parseResponse: response => ({
      data: response.data.createUser,
    })
  });

  const handleDelete = params => ({
    query: gql`mutation deleteUser($id: Int!) {
      deleteUser(id: $id)
    }`,
    variables: params,
    parseResponse: response => ({
      data: response.data,
    })
  });

  const handleGetMany = params => ({
    query: gql`query getUsers($ids: [Int]!) {
      usersFiltered(ids: $ids) {
        id,
        name,
        email
      }
    }`,
    variables: params,
    parseResponse: response => ({
      data: response.data.usersFiltered,
    })
  });

  const handleUpdateMany = params => {
    // TODO
    // Multiple calls to updateUser / updateUsers mutation
    return {};
  }

  const handleDeleteMany = params => {
    // TODO
    // Multiple calls to deleteUser / deleteUsers mutation
    return {};
  }

  const handleGetManyReference = params => {
    // TODO
    // Read a list of resources related to another one
    // params: {
    //   target: {string},
    //   id: {mixed},
    //   pagination: { page: {int} , perPage: {int} },
    //   sort: { field: {string}, order: {string} },
    //   filter: {Object}
    // }
    return {};
  }

  // all react-admin actions
  const actionHandlers = {
    GET_LIST: handleGetList,
    GET_ONE: handleGetOne,
    UPDATE: handleUpdate,
    CREATE: handleCreate,
    DELETE: handleDelete,
    GET_MANY: handleGetMany,
    UPDATE_MANY: handleUpdateMany,
    DELETE_MANY: handleDeleteMany,
    GET_MANY_REFERENCE: handleGetManyReference
  };
}

const buildQuery = introspectionResults => (raFetchType, resourceName, params) => {
  /**
   * This will run an introspection on the GraphQL server specified in client
   * The found schema is present in introspectionResults
   *
   * introspectionResults = {
   *   types = all types on graphql schema
   *   queries = all queries on graphql schema
   *   resources = idk
   *   schema = full graphql schema
   * }
   *
   * raFetchType = react-admin action (e.g. GET_LIST)
   * resourceName = resource / table (e.g. User)
   * params = react admin params to the query (e.g. sort, filter etc)
   * these are the (type, resource, params) from data providers
   * https://marmelab.com/react-admin/DataProviders.html#example-request-processing
   */

  // TODO introspectionResults.resource is null?
  //const resource = introspectionResults.resource.find(r => r.type.name === resourceName);
  if (resourceName === 'User') {
    return handleUserAction(raFetchType, params);
  }
  return null;
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    const client = new ApolloClient({
      uri: "http://127.0.0.1:3000/graphql"
    });
    buildGraphQLProvider({ client, buildQuery })
      .then(dataProvider => {
        this.setState({ dataProvider });
      });
  }
  render() {
    const { dataProvider } = this.state;
    if (!dataProvider) {
      return <div>Loading</div>;
    }
    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="User" list={UserList} edit={UserEdit} create={UserCreate} />
      </Admin>
    );
  }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
