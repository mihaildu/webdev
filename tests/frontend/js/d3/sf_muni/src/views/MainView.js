/*
 * Main view of the app consisting of title, desc, map & route control
 * */
import React from "react";
import * as d3 from "d3";
import EventEmitter from "events";

import MapView from "./MapView";
import RouteControlView from "./RouteControlView";
import {Actions} from "../data/AppActions";

class MainView extends React.Component {
    constructor(props) {
	super(props);
	this.updateVehicles = this.updateVehicles.bind(this);
    }
    componentDidMount() {
	// get initial bus data
	const nextBusFeed = this.props.mainStore.get("nextBusFeed");
	const refreshRate = this.props.mainStore.get("refreshRate");
	const nextBusEmitter = new EventEmitter();

	// when we have all routes
	nextBusEmitter.on("routes", (ret) => {
	    if (!ret.success) {
		console.error(ret.err.message);
		return;
	    }
	    // append display field to each route
	    ret.routes.forEach(route => {
		route.display = true;
	    });
	    // get all vehicles info for each route
	    nextBusFeed.getVehicles(ret.routes, nextBusEmitter, "vehicles");
	    // keep updating vehicle info every refreshRate ms
	    setInterval(this.updateVehicles, refreshRate, nextBusEmitter);
	});

	// when we have all vehicle info
	nextBusEmitter.on("vehicles", (ret) => {
	    if (!ret.success) {
		console.error(ret.err.message);
		return;
	    }
	    Actions.updateRoutes(ret.routes);
	});

	// start the functions chain
	nextBusFeed.getRoutes(nextBusEmitter, "routes");
    }
    updateVehicles(nextBusEmitter) {
	// updates vehicles info/positions
	const nextBusFeed = this.props.mainStore.get("nextBusFeed");
	const routesData = this.props.mainStore.get("routesData");
	nextBusFeed.getVehicles(routesData, nextBusEmitter, "vehicles");
    }
    render() {
	return (
	    <div>
	      <h1>San Francisco Muni</h1>
	      <p>
		If the map is too small you can zoom around using the mouse
		wheel. The bus data is updated every 15s.
	      </p>
	      <MapView {...this.props} />
	      <RouteControlView {...this.props} />
	    </div>
	);
    }
}

export default MainView;
