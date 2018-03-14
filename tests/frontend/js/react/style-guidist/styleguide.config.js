const path = require("path")
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, "lib/MyWrapperFlux"),
    StyleGuideRenderer: path.join(__dirname, "lib/MyStyleGuideRendererFlux")
  }
}
