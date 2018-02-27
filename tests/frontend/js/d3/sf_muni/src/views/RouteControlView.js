/*
 * Route control element - checkboxes that allow you to select which
 * routes to be displayed
 * */
import React from "react";

import {Actions} from "../data/AppActions";

class RouteControlView extends React.Component {
    constructor(props) {
	super(props);
	this.changeDisplayType = this.changeDisplayType.bind(this);
    }
    changeDisplayType(event) {
	// show all routes vs show custom routes
	const routeControl = this.props.mainStore.get("routeControl");
	if (event.target.value != routeControl.displayType) {
	    Actions.changeDisplayType(event.target.value);
	    if (event.target.value == "all")
		Actions.displayAllRoutes();
	}
    }
    changeDisplay(event, tag) {
	// show/hide route specified by tag
	Actions.updateRouteDisplay(tag, event.target.checked);
    }
    render() {
	let routes, index = 0;
	const routesData = this.props.mainStore.get("routesData");
	const routeControl = this.props.mainStore.get("routeControl");
	if (routeControl.displayType == "all") {
	    routes = "";
	} else {
	    routes = routesData.map(route => {
		if (typeof(route.title) == "undefined")
		    return "";
		return (
		    <div key={index++}>
		      <label>
			<input type="checkbox" defaultChecked={true}
			   onChange={(e) => this.changeDisplay(e, route.tag)} />
			{route.title}
		      </label>
		    </div>
		);
	    });
	}
	return (
	    <div id="route-control">
	      <label>
		<input type="radio" name="routeControl"
		       value="all" id="all-route-control"
		       onClick={this.changeDisplayType}
		       defaultChecked={true} />
		  Show all routes
	      </label>
	      <label>
		<input type="radio" name="routeControl"
		       value="custom" id="custom-route-control"
		       onClick={this.changeDisplayType} />
		  Show custom routes
	      </label>
	      <div id="route-tags">
		{routes}
	      </div>
	    </div>
	);
    }
}

export default RouteControlView;
