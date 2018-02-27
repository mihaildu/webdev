/*
 * Actions for the app
 * */
import MainDispatcher from "./MainDispatcher";

const ActionTypes = {
    UPDATE_ROUTES: "UPDATE_ROUTES",
    CHANGE_DISPLAY_TYPE: "CHANGE_DISPLAY_TYPE",
    UPDATE_ROUTE_DISPLAY: "UPDATE_ROUTE_DISPLAY",
    DISPLAY_ALL_ROUTES: "DISPLAY_ALL_ROUTES"
};

const Actions = {
    updateRoutes(routes) {
	MainDispatcher.dispatch({
	    routes,
	    type: ActionTypes.UPDATE_ROUTES
	});
    },
    changeDisplayType(displayType) {
	MainDispatcher.dispatch({
	    displayType,
	    type: ActionTypes.CHANGE_DISPLAY_TYPE
	});
    },
    updateRouteDisplay(tag, display) {
	MainDispatcher.dispatch({
	    tag,
	    display,
	    type: ActionTypes.UPDATE_ROUTE_DISPLAY
	});
    },
    displayAllRoutes() {
	MainDispatcher.dispatch({
	    type: ActionTypes.DISPLAY_ALL_ROUTES
	});
    }
};

export {ActionTypes, Actions};
