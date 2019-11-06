import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { connect, Provider } from "react-redux";

import ActionTypes from "./actions";
import { mainReducer } from "./reducers";
import store from "./store";
import MainComponent from "./components/MainComponent";

/* const ActionTypes = { */
/*   INCREMENT_NUMBER: 'INCREMENT_NUMBER', */
/* } */

/* function mainReducer(state = 0, action) { */
/*   switch(action.type) { */
/*   case ActionTypes.INCREMENT_NUMBER: */
/*     return state + 1; */
/*   default: */
/*     return state; */
/*   } */
/* } */

//const store = createStore(mainReducer);

const MyComponent = ({value, incrementNumber}) => {
  return (
    <div>
      <p>Value is {value}</p>
      <button onClick={incrementNumber}>Increment</button>
    </div>
  );
}

const MyCompStateToProps = state => {
  return {
    value: state
  };
}

const MyCompDispatchToProps = dispatch => {
  return {
    incrementNumber() {
      dispatch({type: ActionTypes.INCREMENT_NUMBER});
    }
  };
}

const MyCompWrapper = connect(
  MyCompStateToProps,
  MyCompDispatchToProps
)(MyComponent);

ReactDOM.render(
  <MainComponent />,
  document.querySelector('#root')
);


/* ReactDOM.render( */
/*   <h1>hi</h1>, */
/*   document.querySelector('#root') */
/* ); */
