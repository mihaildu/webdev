import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import IncrementComponent from "./IncrementComponent";

const MapStateToProps = state => {
  return {
    value: state.value,
    obj: state.obj
  };
}

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const objValue = this.props.obj.val;
    console.log("MainComponent was updated");
    return (
      <div>
        <h1>Value = {this.props.value}</h1>
        <h1>Obj Value = {objValue}</h1>
        <IncrementComponent />
      </div>
    );    
  }
}

/* const MainComponent = ({ value }) => { */
/*   console.log("MainComponent was updated"); */
/*   return ( */
/*     <div> */
/*       <h1>Title {value}</h1> */
/*       <IncrementComponent /> */
/*     </div> */
/*   ); */
/* }; */

export default connect(MapStateToProps)(MainComponent);
