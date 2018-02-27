/*
 * Store for the app. All data should reside here.
 * */
import {ReduceStore} from "flux/utils";
import Immutable from "immutable";
import * as d3 from "d3";

import MainDispatcher from "./MainDispatcher";
import {ActionTypes} from "./AppActions";
import NextBus from "./NextBus";

class MainStore extends ReduceStore {
    constructor() {
	super(MainDispatcher);
    }
    getInitialState() {
	/*
	 * mapData: data specific to the map
	 * nextBusFeed: object to retrive bus data
	 * refreshRate: time (in ms) to update bus data
	 * routesData: list with route info for each routes
	 * routeControl: for now just a variable to know if all
	 *   the routes should be displayed or custom ones
	 * */
	const mapWidth = 1000, mapHeight = 800, sfLongitude = -122.42,
	      sfLatitude = 37.7739, sfScaleFactor = 270000;

	const projection = d3.geoMercator()
		  .scale(sfScaleFactor)
		  .center([sfLongitude, sfLatitude])
		  .translate([mapWidth/2, mapHeight/2]);

	return Immutable.OrderedMap({
	    mapData: {
		sfLongitude,
		sfLatitude,
		sfScaleFactor,
		projection,
		width: mapWidth,
		height: mapHeight,
		minZoomScaleFactor: 0.2,
		maxZoomScaleFactor: 10,
		mapFile: "../public/maps/streets.json"
	    },
	    nextBusFeed: new NextBus("sf-muni"),
	    refreshRate: 15000,
	    routesData: [],
	    routeControl: {
		displayType: "all"
	    }
	});
    }
    reduce(state, action) {
	switch(action.type) {

	case ActionTypes.UPDATE_ROUTES:
	    // force update with new array
	    const newUpdatedRoutes = [...action.routes];
	    return state.set("routesData", newUpdatedRoutes);

	case ActionTypes.CHANGE_DISPLAY_TYPE:
	    const newRouteControl = {};
	    Object.assign(newRouteControl, state.get("routeControl"));
	    newRouteControl.displayType = action.displayType;
	    return state.set("routeControl", newRouteControl);

	case ActionTypes.UPDATE_ROUTE_DISPLAY:
	    const newDisplayRoutes = [...state.get("routesData")];
	    for (let key in newDisplayRoutes) {
		if (newDisplayRoutes[key].tag == action.tag) {
		    newDisplayRoutes[key].display = action.display;
		    break;
		}
	    }
	    return state.set("routesData", newDisplayRoutes);

	case ActionTypes.DISPLAY_ALL_ROUTES:
	    const newRoutes = [...state.get("routesData")];
	    newRoutes.forEach(route => {
		route.display = true;
	    });
	    return state.set("routesData", newRoutes);

	default:
	    return state;
	}
    }
}

export default new MainStore();
