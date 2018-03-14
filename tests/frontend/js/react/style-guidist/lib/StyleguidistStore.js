import { ReduceStore } from "flux/utils"
import Immutable from "immutable"

import processSections from "react-styleguidist/lib/utils/processSections"
import globalizeComponents from "react-styleguidist/lib/utils/globalizeComponents"
import getRouteData from "react-styleguidist/lib/utils/getRouteData"

import StyleguidistDispatcher from "./StyleguidistDispatcher"
import { ActionTypes } from "./StyleguidistActions"

class StyleguidistStore extends ReduceStore {
  constructor() {
    super(StyleguidistDispatcher)
  }
  getInitialState() {
    /*
     * getting sections info
     * this is duplicated code from the actual implementation
     * */
    const styleguide = require('!!react-styleguidist/loaders/styleguide-loader!react-styleguidist/lib/index');

    const allSections = processSections(styleguide.sections);
    globalizeComponents(allSections);
    const { sections, displayMode } = getRouteData(allSections, window.location.hash);

    // hasSidebar={config.showSidebar && displayMode === DisplayModes.all}
    return Immutable.OrderedMap({
      title: styleguide.config.title,
      homepageUrl: "",
      sections,
      hasSidebar: styleguide.config.showSidebar,
      theme: "firstTheme"
    });
  }
  reduce(state, action) {
    switch(action.type) {
    case ActionTypes.UPDATE_THEME:
      return state.set("theme", action.theme);
    default:
      return state;
    }
  }
}

export default new StyleguidistStore();
