import React, { Component } from "react"

export default class MyStyleGuideRenderer extends Component {
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
  render() {
    console.log(this.props.children);
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
