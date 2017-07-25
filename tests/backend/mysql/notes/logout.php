<?php
/*
 * session_start() is needed since this file
 * is not included like 'login.php'
 * instead it's the action of a form element
 *
 * to make it like 'login.php' add everything
 * to a function and call that function in the
 * main file after you include this one
 * */
session_start();
if (isset($_SESSION["id"])) {
    session_destroy();
}
// maybe return to the previous page
header("Location: index.php");
?>
