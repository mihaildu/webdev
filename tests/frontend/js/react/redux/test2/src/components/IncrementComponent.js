import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import ActionTypes from "../actions";

const MapStateToProps = state => {
  return {
    value: state.value,
    color: state.color
  };
}

const MapDispatchToProps = dispatch => {
  return {
    incrementNumber() {
      dispatch({type: ActionTypes.INCREMENT_NUMBER});
    },
    changeColor() {
      dispatch({type: ActionTypes.CHANGE_COLOR});
    }
  };
}

const IncrementComponent = ({value, color, incrementNumber, changeColor}) => {
  const style = {
    height: "50px",
    width: "50px",
    backgroundColor: color
  };
  return (
    <div>
      <span>Value is {value}{' '}</span>
      <button onClick={incrementNumber}>Increment</button>
      <div></div>
      <button onClick={changeColor}>Change square color {' '}</button>
      <div style={style}></div>
    </div>
  );
};

export default connect(MapStateToProps, MapDispatchToProps)(IncrementComponent);
