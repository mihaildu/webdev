import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import ActionTypes from "../actions";

const MapStateToProps = state => {
  return {
    value: state
  };
}

const MapDispatchToProps = dispatch => {
  return {
    incrementNumber() {
      dispatch({type: ActionTypes.INCREMENT_NUMBER});
    }
  };
}

const MainComponent = ({value, incrementNumber}) => (
  <p>Hi from My Component</p>
);

export default connect(MapStateToProps, MapDispatchToProps)(MainComponent);
