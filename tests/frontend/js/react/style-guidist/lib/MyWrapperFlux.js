import React, { Component } from "react"

import { Container } from "flux/utils"
import StyleguidistStore from "./StyleguidistStore"

function MyWrapper (props) {
  return (
    <div>{props.children}</div>
  )
}

function getStores() {
  return [StyleguidistStore];
}

function getState() {
  return {
    storeData: StyleguidistStore.getState()
  };
}

export default Container.createFunctional(MyWrapper, getStores, getState)

//export default MyWrapper;
//import { connect } from "../node_modules/react-redux"
//import { connect } from "react-redux"

//const { Provider } = require("react-redux")
//const configureStore = require("../utils/configureStore").default

/* function mapDispatchToProps(dispatch) { */
/*   return { */
/*   } */
/* } */
/* MyWrapper = connect(null, mapDispatchToProps)(MyWrapper); */
