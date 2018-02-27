import {Container} from "flux/utils";

import MainViewWrapper from "../views/MainViewWrapper";
import MainStore from "../data/MainStore";

// connect the store to the view
function getStores() {
    return [MainStore];
}
function getState() {
    return {
	mainStore: MainStore.getState()
    };
}

export default Container.createFunctional(MainViewWrapper, getStores, getState);
