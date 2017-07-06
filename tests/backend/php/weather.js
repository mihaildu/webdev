$(document).ready(background_height);
$(document).ready(init);

// this is a weird hack
var got_city;
var city_name;

function get_weather(event){
    // prevent the form from submitting
    if (got_city == false) {
	event.preventDefault();
	city_name = $("#city-input").val();

	// if field is empty, do nothing
	if (city_name == "") {
	    return;
	}

	// submit the form
	// TODO find if really necessary
	got_city = true;
	$(this).trigger('click');
	return;
    }

    // show the loading animation
    $("#loading-div").addClass("loader");
    $("#result").hide();

    // perform a call to scrapper.php & update something
    $.post("scrapper.php", {city_name: city_name})
	.done(function(data){
	    $("#loading-div").removeClass("loader");
	    // TODO this can be avoided if warnings
	    // are turned off on server (production)
	    if (data.search("Warning") >= 0) {
		$("#result").html("Could not find city.");
	    } else {
		$("#result").html(data);
	    }
	    $("#result").show();
	    got_city = false;
	});
}

function background_height(){
    var new_height = $(window).height();
    $("#first-segment").css("height", new_height);
}

function init(){
    got_city = false;
    window.onresize = background_height;
    $("#submit-btn").click(get_weather);
    $("#result").hide();
}
