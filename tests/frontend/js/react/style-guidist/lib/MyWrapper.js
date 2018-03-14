import React, { Component } from "react"

export default class MyWrapper extends Component {
  render() {
    console.log(this.props)
    return (
      <div>{this.props.children}</div>
    )
  }
}
