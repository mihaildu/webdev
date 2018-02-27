/*
 * Map of San Francisco with all the buses info
 * */
import React from "react";
import * as d3 from "d3";

class MapView extends React.Component {
    constructor(props) {
	super(props);
    }
    componentDidMount() {
	const mapData = this.props.mainStore.get("mapData");
	// add svg
	let svg = d3.select("#map-div").append("svg")
		.attr("width", mapData.width)
		.attr("height", mapData.height)
		.style("border", "1px solid blue");
	/*
	 * add a group
	 * this will make zooming faster by applying
	 * transforms straight to the group
	 * */
	let group = svg.append("g");

	// add zoom control
	function zoomFunction() {
	    group.attr("transform", d3.event.transform);
	}
	const zoom = d3.zoom()
		  .scaleExtent([mapData.minZoomScaleFactor,
				mapData.maxZoomScaleFactor])
		  .on("zoom", zoomFunction);

	svg.call(zoom);

	// create projection/tranform function
	const geoPath = d3.geoPath(mapData.projection);

	// get map data from file
	d3.json(mapData.mapFile, (err, data) => {
	    // showing street names on map
	    function getStreetName(feature) {
		if (typeof(feature.properties) == "undefined")
		    return "Unnamed Road";
		if (typeof(feature.properties.STREETNAME) == "undefined")
		    return "Unnamed Road";
		return feature.properties.STREETNAME;
	    }
	    group.selectAll("path")
		.data(data.features)
		.enter().append("path")
		.attr("d", geoPath)
		.attr("stroke", "black")
		.attr("stroke-width", 0.5)
		.append("svg:title")
		.text(getStreetName);
	});
    }
    renderVehicles(vehicles) {
	/*
	 * renders vehicles as red circles
	 *
	 * vehicles must be a list of objects
	 * each object must have these fields
	 *   x: x coordinate on the map
	 *   y: y coordinate on the map
	 *   tag: route tag for the vehicle
	 *   id: vehicle id
	 * */

	// remove previous circles
	d3.selectAll("circle").remove();

	// add new ones
	d3.select("g").selectAll("circle")
	    .data(vehicles)
	    .enter().append("circle")
	    .attr("cx", (vehicle) => vehicle.x)
	    .attr("cy", (vehicle) => vehicle.y)
	    .attr("r", 2)
	    .attr("stroke", "black")
	    .attr("stroke-width", 0.1)
	    .attr("fill", "red")
	    .append("svg:title")
	    .text((vehicle) => vehicle.tag + " " + vehicle.id);
    }
    render() {
	// get list of vehicles and show them on map
	const routesData = this.props.mainStore.get("routesData");
	const mapData = this.props.mainStore.get("mapData");
	const vehicles = [];
	routesData.forEach(route => {
	    // route not initialized yet
	    if (typeof(route.display) == "undefined") {
		return;
	    }
	    // route disabled from control
	    if (route.display == false) {
		return;
	    }
	    // route has no vehicles
	    if (typeof(route.vehicles) == "undefined") {
		return;
	    }
	    // get all vehicles for route
	    route.vehicles.forEach(vehicle => {
		// data error
		if (typeof(vehicle) == "undefined")
		    return;
		if (typeof(vehicle.predictable) == "undefined")
		    return;
		// ignore vehicles not predictable
		if (vehicle.predictable == "false")
		    return;

		// project vehicle lat & long
		const realMapPosition = [vehicle.lon, vehicle.lat];
		const vehiclePoint = mapData.projection(realMapPosition);
		vehicle.x = vehiclePoint[0];
		vehicle.y = vehiclePoint[1];
		vehicle.tag = route.tag;
		vehicles.push(vehicle);
	    });
	});
	this.renderVehicles(vehicles);
	return (
	    <div id="map-div">
	    </div>
	);
    }
}

export default MapView;
