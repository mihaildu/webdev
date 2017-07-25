<?php
session_start();
if (!isset($_SESSION["id"])) {
    header("Location: login.php");
}
/*
 * TODO a confirmation message would be nice
 * e.g. "Are you sure you want to delete this note"
 * */

// this was called in a bad way
if (!isset($_POST["note_id"])) {
    // to print error messages I need to add support in index.php
    header("Location: index.php");
}

// connect to db
$db = new mysqli("localhost", "notes_user", "notes_password", "notes");
if($db->connect_errno){
    return;
}

// run delete query
$query = "DELETE FROM Notes WHERE id=" .
	 $db->real_escape_string($_POST["note_id"]);
if ($result = $db->query($query)){
    // support for errors
}

$db->close();
header("Location: index.php");
?>
