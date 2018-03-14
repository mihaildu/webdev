import React, { Component } from "react"
import { Container } from "flux/utils"

import Sections from "rsg-components/Sections"

import StyleguidistStore from "./StyleguidistStore"
import { Actions } from "./StyleguidistActions"

function MyStyleGuideRenderer (props) {
  /*
   * this will be rendered from StyleGuide
   * the following props should be passed here
   * they don't with flux
   *   title
   *   homepageUrl
   *   components - ??
   *   children - sections to be displayed
   *   toc - table of contents (on the left)
   *   hasSidebar
   * */
  const sections = props.storeData.get("sections");
  //const children = <Sections sections={sections} depth={1} />;
  const selectTheme = (
    <select onChange={event => Actions.updateTheme(event.target.value)}>
      <option value="firstTheme">
        firstTheme
      </option>
      <option value="secondTheme">
        secondTheme
      </option>
    </select>
  );
  return (
    <div>
      {selectTheme}
      <Sections sections={sections} depth={1} />
    </div>
  );
}

function getStores() {
  return [StyleguidistStore];
}

function getState() {
  return {
    storeData: StyleguidistStore.getState()
  }
}

export default Container.createFunctional(MyStyleGuideRenderer, getStores, getState)
