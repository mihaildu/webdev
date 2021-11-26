import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from "react-dom";

import App from "./App";

const MyComponent = (props) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>Hello from My Component!</p>
      <p>a = {props.a}</p>
      <p>b = {props.b}</p>
      <div>Count is {count}</div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

function usePost(postId) {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, [postId]);

  return data;
}

const MyComponent2 = () => {
  const post = usePost(1);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Component 2</h1>
      <p>Post title = {post.title}</p>
      <p>Post author = {post.author}</p>
    </div>
  );
}

const initialState = { count: 0 };

const handlers = {
  increment: (state) => ({ count: state.count + 1 }),
  decrement: (state) => ({ count: state.count - 1 })
};

function reducer(state, action) {
  return handlers[action.type](state);
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
}

ReactDOM.render(
  //<MyComponent a={10} b={100} />,
  <App  />,
  document.getElementById("root")
);
