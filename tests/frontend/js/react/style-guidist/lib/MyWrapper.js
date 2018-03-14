import React, { Component } from "react"

//import { connect } from "../node_modules/react-redux"
import { connect } from "react-redux"

//const { Provider } = require("react-redux")
//const configureStore = require("../utils/configureStore").default

class MyWrapper extends Component {
  render() {
    console.log(this.props)
    return (
      <div>{this.props.children}</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // ???
  }
}

MyWrapper = connect(null, mapDispatchToProps)(MyWrapper);

export default MyWrapper;
