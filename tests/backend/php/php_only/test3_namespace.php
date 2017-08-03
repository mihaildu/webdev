<?php
include("test2_namespace.php");

/* trying to access my_func won't work */
//my_func();

/* you need to add the namespace */
//\my_namespace\my_func();

/* instead of typing this ugly thing over and over */
/* TODO this doesn't work */
//use \my_namespace;
//my_func();

/* but this does */
use \my_namespace as nm;
nm\my_func();
?>
