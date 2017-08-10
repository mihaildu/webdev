<?php
/*
 * Credentials for connecting to the DB are stored here.
 * */
define("HOST", "localhost");
define("USER", "notes_user");
define("PASSWORD", "notes_password");
define("DB", "notes");

function connect_to_db(){
    $db = new mysqli(HOST, USER, PASSWORD, DB);
    if($db->connect_errno){
	return array("success" => false,
		     "messages" => array("Error connecting to the DB"));
    }
    return array("success" => true, "db" => $db);
}
?>
