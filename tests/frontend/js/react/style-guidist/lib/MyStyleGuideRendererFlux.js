import React, { Component } from "react"

import { Container } from "flux/utils"
import StyleguidistStore from "./StyleguidistStore"

function MyStyleGuideRenderer (props) {
  /*
   * this will be rendered from StyleGuide
   * the following props will be passed here
   *   title
   *   homepageUrl
   *   components - ??
   *   children - sections to be displayed
   *   toc - table of contents (on the left)
   *   hasSidebar
   * */
  //console.log(props);
  //console.log(arguments);
  return (
    <div>
      {props.children}
    </div>
  )
}

function getStores() {
  return [StyleguidistStore];
}

function getState() {
  console.log(arguments)
  return {
    storeData: StyleguidistStore.getState()
  }
}

export default Container.createFunctional(MyStyleGuideRenderer, getStores, getState)
//import { Provider } from "react-redux"
