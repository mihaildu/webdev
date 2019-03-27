import { createStore, combineReducers } from "redux";
import { connect, Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

main();

function main() {
  test6_combine_reducers();
  //test5_react_fast();
  //test4_react();
  //test3_combining_reducers();
  //test2_recap();
  //test1_basics();
}

function test6_combine_reducers() {
  const ActionTypes = {
    INCREMENT_NUMBER: 'INCREMENT_NUMBER',
    DECREMENT_NUMBER: 'DECREMENT_NUMBER',
  }

  function firstReducer(state = {val1: 10}, action) {
    switch(action.type) {
    case ActionTypes.INCREMENT_NUMBER:
      return {val1: state.val1 + 1}
    default:
      return state;
    }
  }

  function secondReducer(state = {val2: 20}, action) {
    switch(action.type) {
    case ActionTypes.DECREMENT_NUMBER:
      return {val2: state.val2 - 1};
    default:
      return state;
    }
  }

  const store = createStore(combineReducers({firstReducer, secondReducer}));
  const MapStateToProps1 = state => {
    return {
      value: state
    };
  };
  const MapDispatchToProps1 = dispatch => {
    return {
      incrementNumber() {
        dispatch({type: ActionTypes.INCREMENT_NUMBER});
      }
    };
  }

  const MapStateToProps2 = state => {
    return {
      value: state
    };
  }
  const MapDispatchToProps2 = dispatch => {
    return {
      decrementNumber() {
        dispatch({type: ActionTypes.DECREMENT_NUMBER});
      }
    };
  }

  /* <p>Value is {value}</p> */
  const MyComponent1 = ({value, incrementNumber}) => {
    console.log(value);
    return (
      <div>
        <button onClick={incrementNumber}>Increment</button>
      </div>
    )
  }
  const MyCompWrapper1 = connect(
    MapStateToProps1,
    MapDispatchToProps1
  )(MyComponent1);

  /* <p>Value is {value}</p> */
  const MyComponent2 = ({value, decrementNumber}) => {
    console.log(value);
    return (
      <div>
        <button onClick={decrementNumber}>Decrement</button>
      </div>
    )
  }
  const MyCompWrapper2 = connect(
    MapStateToProps2,
    MapDispatchToProps2
  )(MyComponent2);

  ReactDOM.render(
    <Provider store={store}>
      <div>
        <MyCompWrapper1 />
        <MyCompWrapper2 />
      </div>
    </Provider>,
    document.querySelector('#root')
  );
}

function test5_react_fast() {
  // store = Number

  // create actions
  const ActionTypes = {
    INCREMENT_NUMBER: 'INCREMENT_NUMBER',
  }

  // reducer
  function mainReducer(state = 0, action) {
    switch(action.type) {
    case ActionTypes.INCREMENT_NUMBER:
      return state + 1;
    default:
      return state;
    }
  }

  const store = createStore(mainReducer);

  // store -> props
  const MapStateToProps = state => {
    return {
      value: state
    };
  }

  // actions -> props
  const MapDispatchToProps = dispatch => {
    return {
      incrementNumber() {
        dispatch({type: ActionTypes.INCREMENT_NUMBER});
      }
    };
  }

  // component using props from above
  const MyComponent = ({value, incrementNumber}) => (
    <div>
      <p>Value is {value}</p>
      <button onClick={incrementNumber}>Increment</button>
    </div>
  )

  // connect everything together
  const MyCompWrapper = connect(
    MapStateToProps,
    MapDispatchToProps
  )(MyComponent);

  // render
  ReactDOM.render(
    <Provider store={store}>
      <MyCompWrapper />
    </Provider>,
    document.querySelector('#root')
  );
}

function test4_react() {
  /* there are some react bindings - react-redux npm module */

  /* creating a react (presentational) component */
  const MyComp = ({value, incrementValue}) => {
    return (
      <div>
        <p>Value is {value}</p>
        <button onClick={incrementValue}>Increment</button>
      </div>
    )
  };
  MyComp.propTypes = {
    value: PropTypes.number.isRequired,
    incrementValue: PropTypes.func.isRequired
  };

  /*
   * to bind it to the store you can wrap it in a container
   * component, similar to flux
   * */

  /*
   * we first write a function that takes as input the state from the store
   * and returns props only by this component
   *
   * state = {value: ...}
   * */
  const MyCompStateToProps = state => {
    return {
      value: state
    };
  }

  /*
   * In Flux we were calling dispatch ourselves when something happens
   * e.g. importing Actions and generating an action when something was
   * clicked.
   *
   * Here we pass the actions via props from the functional component.
   * dispatch will be store.dispatch
   * */
  const MyCompDispatchToProps = dispatch => {
    return {
      incrementValue() {
        dispatch({type: "INCREMENT"});
      }
    };
  }

  /* so MyComp will have props.value and props.incrementValue */

  /* finally, create the functional/presentational component */
  const MyCompWrapper = connect(
    MyCompStateToProps,
    MyCompDispatchToProps
  )(MyComp);

  /*
   * you still need to set up the reducers/store part
   * to do this you wrap your functional component in a <Provider>
   * component
   *
   * this will use something called "context" to pass down store
   * to each component
   * */
  function valueReducer(state = 0, action) {
    switch(action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
    }
  }
  let store = createStore(valueReducer);
  ReactDOM.render(
    <Provider store={store}>
      <MyCompWrapper />
    </Provider>,
    document.getElementById("root")
  );
}

function test3_combining_reducers() {
  /*
   * so you can change how the store looks like
   * just by adding new reducers everytime to deal with actions
   * */
  function firstReducer(state = 0, action) {
    switch(action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
    }
  }
  function secondReducer(state = "", action) {
    switch(action.type) {
    case "APPEND":
      return state + action.string;
    case "CLEAR":
      return "";
    default:
      return state;
    }
  }

  /*
   * these reducers work on different type of objects
   * so to combine them you'd need to have a top object
   * state/store
   *   firstState -> number
   *   secondStaet -> string
   * */

  /* one way to do it is like this */
  function combinedReducers(state = {}, action) {
    /*
     * passing undefined to first/secondReducer will use
     * default value
     * */
    return {
      firstState: firstReducer(state.firstState, action),
      secondState: secondReducer(state.secondState, action)
    }
  }

  let firstStore = createStore(combinedReducers);
  firstStore.subscribe(() => {
    console.log(firstStore.getState());
  });

  /* now you use actions from both reducers */
  firstStore.dispatch({type: "INCREMENT"});
  firstStore.dispatch({type: "APPEND", string: "some string"});

  /*
   * to use a more generic reducer combiner
   * e.g. if you have a list of reducers, instead of adding
   * an entry for each you can use combineReducers from redux
   * */
  const combinedReducer = combineReducers({firstReducer, secondReducer});
  let secondStore = createStore(combinedReducer);
  secondStore.subscribe(() => {
    console.log(secondStore.getState());
  });

  secondStore.dispatch({type: "INCREMENT"});
  secondStore.dispatch({type: "APPEND", string: "other string"});

  /*
   * you can add as many reducers you want to combineReducers
   * or for example use the spread operator if you have a list
   * */

  /*
   * to unsubscribe a handler, you have to save what subscribe returns
   * */
  let thirdStore = createStore(firstReducer);
  function someHandler(store) {
    console.log("hello from some handler");
    console.log(store.getState());
  }
  const unsubscribe = thirdStore.subscribe(() => someHandler(thirdStore));

  /* dispatch some actions */
  thirdStore.dispatch({type: "INCREMENT"});

  unsubscribe();

  /* these actions will be ignored */
  thirdStore.dispatch({type: "DECREMENT"});
}

function test1_basics() {

  /* passing initial data like this?? */
  function counter(state = 0, action) {
    /**
     * In redux you apply actions in reducers.
     * This function is a reducer. This seems better than
     * flux where you apply actions only in stores.
     */
    console.log(action);
    switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
    }
  }

  /**
   * you can create a store that uses this reducer
   * how do you pass initial data?
   */
  let store = createStore(counter);

  /* this gets called when the state updates */
  store.subscribe(() => {
    /* to get the state/store */
    console.log("state after update: ", store.getState());
  });

  store.dispatch({type: "INCREMENT"});
  store.dispatch({type: "DECREMENT"});

  /* I guess you can pass more data into action */
  store.dispatch({payload: "hidden text", type: "EXCEPTION"});  

  /* action creator/wrapper for actions */
  function incrementValues() {
    // shouldn't this dispatch the action?
    return {
      type: "INCREMENT"
    }
  }

  /**
   * you can return new object with Object.assign() without using
   * Immutable.js
   */
  function myReducer(state, action) {
    switch (action.type) {
    case "ACTION_UPDATE":
      return Object.assign({}, state, {value: 100});
    default:
      return state;
    }
  }
}

function test2_recap() {

  /* small redux recap */

  /*
   * first, you don't create a store, you create a reducer
   * how do you intialize state in store??
   * you initialize state in reducers??
   *
   * apparently you can use an intial state in createStore
   * createStore(reducer, [preloadedState], [enhancer])
   * */

  /* define some actions */
  const ActionTypes = {
    APPEND_STRING: "APPEND_STRING",
    CLEAR: "CLEAR"
  };

  /*
   * this is a reducer - modifies state based on action
   * you can specify initial state here
   * is it easier when you combine reducers later?
   * not defining a shape for the state at the start?
   *
   * apparently there's afirst action when you create the store
   * {type: '@@redux/INIT'}
   * */
  function firstReducer(state = "", action) {
    console.log("new action received: ", action);
    switch(action.type) {
    case ActionTypes.APPEND_STRING:
      return state + action.string;
    case ActionTypes.CLEAR:
      return "";
    default:
      return state;
    }
  }

  let store = createStore(firstReducer);

  /* to dispatch actions you use the store */
  //store.dispatch({type: ActionTypes.APPEND_STRING, string: "random"});

  /*
   * to get the state use store.getState()
   * the action will be executed async so you have to wait for the execution
   * to see some changes
   * */
  //console.log(store.getState());

  /*
   * to get a handler that runs everytime after action is dispatched
   * you can register multiple handles too
   * */
  function storeCallback(store) {
    console.log(store.getState());
  }

  store.subscribe(() => storeCallback(store));

  /* now start dispatching actions */
  store.dispatch({type: ActionTypes.APPEND_STRING, string: "some string"});

  /*
   * you can also create functions to dispatch actions like in flux
   * you would need a ref to the store (e.g. import)
   * */
  const localStore = store; // import
  const Actions = {
    addString(string) {
      localStore.dispatch({
        type: ActionTypes.APPEND_STRING,
        string
      });
    }
  };

  Actions.addString(" more string stuff");
}
