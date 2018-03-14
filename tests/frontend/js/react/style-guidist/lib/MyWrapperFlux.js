import React, { Component } from "react"

import { Container } from "flux/utils"
import StyleguidistStore from "./StyleguidistStore"

function MyWrapper (props) {
  // props.children is lost here too
  console.log(props.storeData.get("theme"));
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
