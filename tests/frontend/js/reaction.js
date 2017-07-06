// initialize best_time once
best_time = Number.POSITIVE_INFINITY;

function start(){
    // set handler for circle click
    var red_circle = document.getElementById("red-circle");
    red_circle.onclick = hide_circle;

    // change start button
    var start_btn = document.getElementById("start-btn");
    start_btn.innerHTML = "Stop";
    start_btn.onclick = stop;

    // start the "game"
    start_time = 0;
    hide_circle();
}

function hide_circle(){
    if (start_time > 0) {
	var d = new Date();
	var reaction_time = document.getElementById("reaction-time");
	var total_time = d.getTime() - start_time;
	total_time_str = total_time.toString() + " ms";
	reaction_time.innerHTML = total_time_str;
	if (total_time < best_time) {
	    var best_time_span = document.getElementById("best-time");
	    best_time_span.innerHTML = total_time_str;
	    best_time = total_time;
	}
    }

    // hide
    var red_circle = document.getElementById("red-circle");
    red_circle.style.display = "none";

    // set random margins
    var max_xpos = 600;
    var max_ypos = 300;
    var xpos = Math.floor(Math.random() * max_xpos);
    var ypos = Math.floor(Math.random() * max_ypos);
    red_circle.style.marginLeft = xpos.toString() + "px";
    red_circle.style.marginTop = ypos.toString() + "px";

    // set random timeout for display
    var max_timeout = 3000;
    var timeout = Math.floor(Math.random() * max_timeout);
    setTimeout(show_circle, timeout);
}

function show_circle(){
    var red_circle = document.getElementById("red-circle");
    red_circle.style.display = "block";
    var d = new Date();
    start_time = d.getTime();
}

function stop(){
    // remove handler for circle click
    var red_circle = document.getElementById("red-circle");
    // TODO this doesn't work, why?
    // document gets updated with old values after this is run?
    //red_circle.removeAttribute("onclick");

    // this works
    red_circle.onclick = null;

    // change stop button
    var start_btn = document.getElementById("start-btn");
    start_btn.innerHTML = "Start";
    start_btn.onclick = start;

    // resets margins & show
    var red_circle = document.getElementById("red-circle");
    red_circle.style.marginLeft = "0px";
    red_circle.style.marginTop = "0px";
    red_circle.style.display = "block";
}
