/*
 * D3 - javascript library that allows you to easily play around
 *   with data in HTML docs.
 *
 * Website: https://d3js.org/
 * Examples: https://github.com/d3/d3/wiki/Gallery
 * Docs: https://github.com/d3/d3/wiki
 * API: https://github.com/d3/d3/blob/master/API.md
 * Tutorials: https://github.com/d3/d3/wiki/Tutorials
 * */

$(document).ready(main);

function main() {
    test1();
}

function test1() {
    /* setting paragraph color - old way vs d3 way */
    function old_way() {
        let paragraphs = document.getElementsByTagName("p");
        for (let i = 0; i < paragraphs.length; i++) {
            let paragraph = paragraphs.item(i);
            paragraph.style.setProperty("color", "pink", null);
        }
    }
    function d3_way() {
        /* can you do something similar with jQuery? */
        d3.selectAll("p").style("color", "green");
    }
    //d3_way();

    /* changing bg color */
    function d3_change_bg() {
        d3.select("body").style("background-color", "black");
    }
    //d3_change_bg();

    /* select() works like CSS selector - e.g. selecting a class */
    function d3_selector() {
        d3.select(".my-class").style("color", "red");
    }
    //d3_selector();

    function function_value() {
        /* using functions as values is diff from jQuery */
        d3.selectAll("p").style("color", function() {
            return "hsl(" + Math.random() * 360 + ",100%,50%)";
        });

        /*
         * you can also do more cool stuff, like alternate between
         * colors on paragraphs
         * */
        d3.selectAll("p").style("color", function(d, i) {
            return i % 2 ? "red" : "black";
        });

        /* so apparently d is for data, which can be passed like this */
        d3.selectAll("p")
            .data([23, 42])
            .style("font-size", function(d) {
                /* d will be each elem from array */
                return d + "px";
            });
    }
    //function_value();

    function enter_exit() {
	/*
	 * so enter() allows you to create new elements
	 * because data is bigger than the number of <p> we have
	 * new ones will be appended (3, 4)
	 * */
	d3.select("body")
	    .selectAll("p")
	    .data([1, 2, 3, 4])
	    .enter().append("p")
	    .text(function(d) { return "I’m number " + d + "!"; });

	/* update */
	var p = d3.select("body")
		.selectAll("p")
		.data([4, 8, 15, 16, 23, 42])
		.text(function(d) { return d; });

	/* enter */
	p.enter().append("p")
	    .text(function(d) { return d; });

	/* exit - what should this do?? */
	p.exit().remove();
    }
    //enter_exit();

    function d3_transitions() {
	/* this will fade background to black */
	d3.select("body").transition()
	    .style("background-color", "black");
    }
    //d3_transitions();

    function d3_chart() {
	/* line width */
	let data = [30, 60, 90];
	d3.select(".chart")
	    .selectAll("div")
	    .data(data)
	    .enter()
	    .append("div")
	    .style("width", function(d) { return d + "px"; })
	    .text(function(d) { return d; });
    }
    //d3_chart();

    function d3_scale() {
	/* converting from [a, b] to [c, d] */
	let scale = d3.scaleLinear();
	/* to */
	scale.domain([0, 1]);
	/* from */
	scale.range([0, 100]);

	console.log(scale(0));
	console.log(scale(0.5));
	console.log(scale(1));

	/* you can also do it in one go */
	let scale2 = d3.scaleLinear()
		.domain([0, 2])
		.range([0, 50]);
    }
    //d3_scale();

    function d3_shapes() {
	/* constructing shapes with d3 */
	let svg = d3.select("body").append("svg");
	svg.attr("width", 250);
	svg.attr("height", 250);

	let rect = svg.append("rect");
	rect.attr("x", 50);
	rect.attr("y", 50);
	rect.attr("width", 150);
	rect.attr("height", 150);
	rect.attr("fill", "pink");
    }
    //d3_shapes();

    function d3_shapes2() {
	/* creating shapes after data */
	let svg = d3.select("body").append("svg")
		.attr("width", 250)
		.attr("height", 250);

	let data = [1, 2, 3, 4, 5];
	let scale = d3.scaleLinear()
		.domain([1, 5])
		.range([0, 200]);

	svg.selectAll("rect")
	    .data(data)
	    .enter().append("rect")
	    .attr("x", (d) => scale(d))
	    .attr("y", 50)
	    .attr("width", 20)
	    .attr("height", 20);
    }
    //d3_shapes2();

    function d3_enter_explained() {
	let svg = d3.select("body").append("svg")
		.attr("width", 250)
		.attr("height", 250);

	//let data = [1, 2, 3, 4, 5];
	let scale = d3.scaleLinear()
		.domain([1, 5])
		.range([0, 200]);

	function render(data, color) {
	    let rects = svg.selectAll("rect").data(data);

	    /*
	     * these attr will only be applied to the newly
	     * created rectangles
	     * */
	    rects.enter().append("rect")
		.attr("x", (d) => scale(d))
		.attr("y", 50)
		.attr("width", 20)
		.attr("height", 20)
		.attr("fill", color);
	}

	function render2(data, color) {
	    let rects = svg.selectAll("rect").data(data);
	    /*
	     * here we first create the new rects with enter()
	     * then we apply the props to all elements
	     *
	     * TODO doesn't seem to work
	     * look at code on github - this doesn't work either
	     * view-source:http://curran.github.io/screencasts/introToD3/examples/code/snapshot63/
	     * */
	    rects.enter().append("rect");
	    rects
		.attr("x", (d) => scale(d))
		.attr("y", 50)
		.attr("width", 20)
		.attr("height", 20)
		.attr("fill", color);
	}

	function render3(data, color){

            // Bind data
            var rects = svg.selectAll("rect").data(data);

            // Enter
            rects.enter().append("rect");

            // Update
            rects
		.attr("x", scale)
		.attr("y", 50)
		.attr("width",  20)
		.attr("height", 20)
		.attr("fill", color);
	}

	render3([1, 2, 3], "red");
	render3([1, 2, 3, 4, 5], "blue");
    }
    //d3_enter_explained();

    function d3_geo() {
	/*
	 * d3.geo - using d3 with geographic data
	 *
	 * d3.geoPath (used to be d3.geo.path)
	 *   return a geoPath object
	 *   this object will convert geoJSON features to (x, y)
	 *   geoJSON features are usually in (latitude, longitude)
	 *   to get the right (x, y) a projection should be used as well
	 *
	 * e.g. let gp = d3.geoPath(proj);
	 * you can also set it at a later time, gp.projection(new_proj)
	 *
	 * a projection is a function that maps (lat, long) -> (x, y)
	 * e.g. mercator(x, y) -> (x, Math.log(Math.tan(Math.PI / 4 + y / 2)))
	 * */
	let projection = d3.geoMercator();
	let geoPath = d3.geoPath(projection);

	/*
	 * this is a geoJSON point type
	 * coordinates are in latitude and longitude
	 * */
	let pointFeature = {
	    "type": "Point",
	    "coordinates": [
		-105.01621,
		39.57422
	    ]
	};

	/*
	 * applying geoPath to them will convert to (x, y)
	 * however, this is a path svg object, so it looks like "M..."
	 * */
	console.log(geoPath(pointFeature));

	/* line feature - more suited for path svg */
	let lineFeature = {
	    "type": "LineString",
	    "coordinates": [
		[
		    -101.744384765625,
		    39.32155002466662
		],
		[
		    -101.5521240234375,
		    39.330048552942415
		],
		[
		    -101.40380859375,
		    39.330048552942415
		],
		[
		    -101.33239746093749,
		    39.364032338047984
		],
		[
		    -101.041259765625,
		    39.36827914916011
		]
	    ]
	};
	console.log(geoPath(lineFeature));

	/*
	 * to get random geoJSON values
	 * http://geojsonlint.com/
	 * */

	/*
	 * you can also apply this to a combination of features
	 * e.g. you can use the entire feature collection
	 * */
	let featureCollection = {
	    "type": "FeatureCollection",
	    "features": [
		{
		    "type": "Feature",
		    "properties": {
			"name": "Van Dorn Street",
			"marker-color": "#0000ff",
			"marker-symbol": "rail-metro",
			"line": "blue"
		    },
		    "geometry": {
			"type": "Point",
			"coordinates": [
			    -77.12911152370515,
			    38.79930767201779
			]
		    }
		},
		{
		    "type": "Feature",
		    "properties": {
			"name": "Franconia-Springfield",
			"marker-color": "#0000ff",
			"marker-symbol": "rail-metro",
			"line": "blue"
		    },
		    "geometry": {
			"type": "Point",
			"coordinates": [
			    -77.16797018042666,
			    38.766521892689916
			]
		    }
		}
	    ]
	};
	console.log(geoPath(featureCollection));

	/* using a real geoJSON file with USA map */
	d3.json("state.geo.json").get((err, data) => {
	    /*
	     * data is a feature collection, we just need
	     * to convert it to path and draw it
	     * */

	    /* making the svg zoom-able */
	    function zoomFunction() {
		/* really really slow */
		d3.selectAll("path")
		    .attr("transform", d3.event.transform);
	    }

	    let zoom = d3.zoom()
		    .scaleExtent([0.2, 10])
		    .on("zoom", zoomFunction);

	    /* to draw an SVG object */
	    let svg = d3.select("body").append("svg")
		    .attr("width", 1280)
		    .attr("height", 800)
		    .style("border", "1px solid red")
		    .call(zoom);

	    /*
	     * obtaining the path from the feature collection
	     * using the default mercator projection, the data
	     * in the svg will not be centered
	     *
	     * to get a better view of the date, apply some
	     * translations/scaling
	     *
	     * scale() = zooming in
	     * translate([x, y]) = moves image on x/y by number of pixels
	     * center([lat, long]) = centers image at (latitude, longitude)
	     * */

	    //let pathData = geoPath(data);
	    /* US is at 37.0902° N, 95.7129° W */
	    let projUSA = d3.geoMercator()
		    .translate([640, 400])
		    .center([-96, 37])
		    .scale(290);

	    let geoPathUSA = d3.geoPath(projUSA);
	    let pathData = geoPathUSA(data);

	    /* adding a path to the svg */
	    let path = svg.append("path")
                    .attr("d", pathData)
                    .attr("stroke", "black")
                    .attr("stroke-width", 1);
	});

	/* let projection = d3.geoAlbers() */
	/* 	.center([0, 37.8]) */
	/* 	.rotate([122.42, 0]) */
	/* 	.parallels([30, 40]) */
	/* 	.scale(200000) */
	/* 	.translate([width/2, height/2]); */
    }
    //d3_geo();


    function d3_geo_json() {
	/*
	 * TODO - test in future
	 *   d3.svg - this should create a new svg
	 *     right now I use d3...append("svg")
	 *     then we have d3.svg.line, circle etc
	 * */

	// I can use append() straight away
	/* g.selectAll("path") */
	/* 	.data(data.features) */
	/* 	.enter().append("path") */
	/* 	.attr("d", geoPath) */
	/* 	.attr("stroke", "black") */
	/* 	.attr("stroke-width", 1); */

	let width = 1000, height = 800;
	let svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.style("border", "1px solid red");

	/* add a group */
	let g = svg.append("g");

	function zoomFunction() {
	    g.attr("transform", d3.event.transform);
	}

	let minScaleFactor = 0.2, maxScaleFactor = 10;
	let zoom = d3.zoom()
		.scaleExtent([minScaleFactor, maxScaleFactor])
		.on("zoom", zoomFunction);

	svg.call(zoom);

	/* SF 37.7749° N, 122.4194° W */
	let proj = d3.geoMercator()
		.scale(270000)
		.center([-122.42, 37.7739])
		.translate([width/2, height/2]);
	let geoPath = d3.geoPath(proj);

	d3.json("streets.json").get((err, data) => {
	    /*
	     * TODO maybe I need to .data() after all
	     * if I want to set street names etc
	     * */
	    g.append("path")
		.attr("d", geoPath(data))
		.attr("stroke", "black")
		.attr("stroke-width", 0.5);
	});

	/* get all routes */
	let nextBusLink = "http://webservices.nextbus.com/service/publicJSONFeed";
	let routesCommand = "?command=routeList&a=sf-muni";
	// &r=N&t=0
	// t = time(NULL)
	let busCommand = "?command=vehicleLocations&a=sf-muni";
	let routes;
	d3.json(nextBusLink + routesCommand).get((err, data) => {
	    routes = data.route;
	    // routes[6] = N
	    //console.log(routes[6]);

	    routes.forEach(route => {

		if (typeof(route.tag) == "undefined")
		    return;
		
		/* get all buses for route N */
		d3.json(nextBusLink + busCommand + "&r=" + route.tag).get((err, data) => {

		    if (typeof(data.vehicle) == "undefined")
			return;

		    if (!Array.isArray(data.vehicle)) {
			/* apparently, if only one vehicle - obj instead of array */
			console.log(data);
			return;
		    }

		    //console.log(data.vehicle[0]);
		    let tag = route.tag;
		    data.vehicle.forEach(bus => {
			let busPoint = proj([bus.lon, bus.lat]);
			g.append("circle")
			    .attr("cx", busPoint[0])
			    .attr("cy", busPoint[1])
			    .attr("r", 2)
			    .attr("stroke", "black")
			    .attr("stroke-width", 0.1)
			    .attr("fill", "red")
			    .append("svg:title")
			    .text(tag + " " + bus.id);
		    });

		    // data.vehicle[0].lat, data.vehicle[0].lon
		    // x = lon
		    // y = lat
		    //cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"
		    //g.append("circle");
		    /* let pt = { */
		    /*     "type": "Point", */
		    /*     "coordinates": [ */
		    /* 	data.vehicle[0].lon, */
		    /* 	data.vehicle[0].lat */
		    /*     ] */
		    /* }; */
		    /* let pt_xy = geoPath(pt); */

		    /* let pt_xy2 = proj([data.vehicle[0].lon, data.vehicle[0].lat]); */

		    /* g.append("path") */
		    /*     .attr("d", pt_xy) */
		    /*     .attr("fill", "red") */
		    /*     .attr("stroke-width", 0.1); */

		    /* g.append("circle") */
		    /*     .attr("cx", pt_xy2[0]) */
		    /*     .attr("cy", pt_xy2[1]) */
		    /*     .attr("r", 2) */
		    /*     .attr("fill", "red"); */
		});
	    });
	});
    }
    d3_geo_json();
}
