const path = require("path")
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, "lib/MyWrapper"),
    StyleGuideRenderer: path.join(__dirname, "lib/MyStyleGuideRenderer")
  }
}
