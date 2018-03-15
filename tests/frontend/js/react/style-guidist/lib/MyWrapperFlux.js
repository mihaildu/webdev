import React, { Component } from "react"

import { Container } from "flux/utils"
import StyleguidistStore from "./StyleguidistStore"

function getStores() {
  return [StyleguidistStore];
}

function getState() {
  return {
    storeData: StyleguidistStore.getState()
  };
}

export default class MyWrapper extends Component {
  render() {
    const props = this.props;
    function MyWrapperFunctional (propsFlux) {
      console.log(propsFlux.storeData.get("theme"));
      return (
        <div>{props.children}</div>
      )
    }
    const MyWrapperFlux = Container.createFunctional(MyWrapperFunctional,
                                                     getStores, getState);

    return (
      <MyWrapperFlux />
    )
  }
}
