<?php

// download the page for the right city from weather-forecast.com
// TODO test if the post var is set
$city_name = $_POST["city_name"];
$city_name = str_replace(" ", "-", $city_name);
$url_str = "http://www.weather-forecast.com/locations/" . $city_name .
	   "/forecasts/latest";

// use this hardcoded regex to find the info we want
$my_regex = '/Day Weather Forecast Summary:<\/b><span ' .
	    'class="read-more-small"><span class="read-more-content">' .
	    ' <span class="phrase">(.*?)<\/span><\/span><\/span>/i';

// this needs some tweaking
try {
    $page = file_get_contents($url_str);
    if ($page === false) {
	echo("Could not find city");
    } else {
	preg_match($my_regex, $page, $matches);
	// TODO check if found/length here
	echo($matches[1]);
    }
} catch (Exception $e) {
    echo("Could not find city");
}
?>
