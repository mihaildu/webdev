/*
 * Class to interact with the NextBus feed
 * */
import * as d3 from "d3";

class NextBus {
    constructor(agencyName) {
	this.agencyName = agencyName;
	this.nextBusFeed = "http://webservices.nextbus.com/service/publicJSONFeed";
	this.routesCommand = "?command=routeList&a=" + agencyName;
	this.busCommand = "?command=vehicleLocations&a=" + agencyName;
    }
    getRoutes(ee, event) {
	/*
	 * returns list of available routes
	 * input
	 *   ee: EventEmitter object
	 *   event: event ee is listening to
	 *
	 * after fetching routes data, "event" will be emitted on "ee"
	 * the callback should accept one argument: ret
	 *   ret: {
	 *     success: true/false,
	 *     err: optional error object, if unsuccessful
	 *     routes: optional route list, if successful
	 *   }
	 * */
	const feedCommand = this.nextBusFeed + this.routesCommand;
	d3.json(feedCommand).get((err, data) => {
	    // no routes to show/error
	    if (err) {
		ee.emit(event, {success: false, err});
		return;
	    }
	    if (typeof(data.route) == "undefined") {
		const ret = {
		    success: false,
		    err: new Error("No route data to show")
		};
		ee.emit(event, ret);
		return;
	    }
	    let routes = data.route;
	    if (!Array.isArray(routes)) {
		// only one route
		routes = [routes];
	    }
	    const ret = {
		routes,
		success: true
	    };
	    ee.emit(event, ret);
	});
    }
    getVehicles(routes, ee, event) {
	/*
	 * returns all vehicles data (e.g. position) for the list of routes
	 * input
	 *   routes: list of route objects
	 *     a route object must have a tag field used to identify route
	 *     a route object must not be const since it will be updated
	 *   ee: EventEmitter object
	 *   event: event ee is listening to
	 *
	 * after fetching vehicles data, "event" will be emitted on "ee"
	 * the callback should accept one argument: ret
	 *   ret: {
	 *     success: true/false,
	 *     err: optional error object, if unsuccessful
	 *     routes: optional route list, if successful
	 *       this is the input route list where each route object
	 *       has a new field called vehicles with the new info and
	 *       a lastTime field with time of request
	 *   }
	 * */
	if (!Array.isArray(routes)) {
	    const ret = {
		success: false,
		err: new Error("Bad routes argument in getVehicles: " + routes)
	    };
	    ee.emit(event, ret);
	    return;
	}

	// return routes only when we have all the info
	let validRoutes = routes.length;
	let numUpdated = 0;
	routes.forEach(route => {
	    // bad route data, ignore
	    if (typeof(route.tag) == "undefined") {
		validRoutes--;
		return;
	    }

	    /*
	     * not using a t value will return all vehicles
	     * we want this the first time around
	     * */
	    let t;
	    if (typeof(route.lastTime) == "undefined") {
		t = "";
	    } else {
		t = "&t=" + route.lastTime.time;
	    }
	    const routeFeed = this.nextBusFeed + this.busCommand +
		      "&r=" + route.tag + t;

	    d3.json(routeFeed).get((err, data) => {
		numUpdated++;
		if (err) {
		    /*
		     * while this seems like an error,
		     * some routes might've been updated
		     * */
		    if (numUpdated == validRoutes) {
			const ret = {
			    routes,
			    success: true
			};
			ee.emit(event, ret);
		    }
		    return;
		}
		// only one vehicle
		if (!Array.isArray(data.vehicle)) {
		    data.vehicle = [data.vehicle];
		}
		// first time around
		if (typeof(route.vehicles) == "undefined") {
		    // get rid of "undefined" vehicles
		    route.vehicles = data.vehicle.filter((vehicle) => {
			return typeof(vehicle) != "undefined";
		    });
		} else {
		    // only update new info
		    data.vehicle.forEach(vehicle => {
			// data error
			if (typeof(vehicle) == "undefined")
			    return;

			let newVehicle = true;
			for (let key in route.vehicles) {
			    if (route.vehicles[key].id == vehicle.id) {
				route.vehicles[key] = vehicle;
				newVehicle = false;
				break;
			    }
			}
			if (newVehicle) {
			    route.vehicles.push(vehicle);
			}
		    });
		}
		route.lastTime = data.lastTime;
		if (numUpdated == validRoutes) {
		    const ret = {
			routes,
			success: true
		    };
		    ee.emit(event, ret);
		}
	    });
	});
    }
}

export default NextBus;
