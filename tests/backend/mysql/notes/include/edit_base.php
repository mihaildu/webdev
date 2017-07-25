<?php
function attempt_save(){
    /*
     * No reason to make a generic version for this function.
     * Just run an "insert" query after checking the input.
     * */
    $ret = check_error_input();
    if(!$ret["success"]){
	return array("success" => false, "messages" => $ret["messages"]);
    }

    $db = new mysqli("localhost", "notes_user", "notes_password", "notes");
    if($db->connect_errno){
	return array("success" => false,
		     "messages" => array("Error connecting to the database"));
    }

    if ($_POST["action"] == "edit"){
	$ret = update_note($db);
	if(!$ret["success"])
	    return array("success" => false, "messages" => $ret["messages"]);
    } else {
	$ret = insert_note($db);
	if(!$ret["success"])
	    return array("success" => false, "messages" => $ret["messages"]);
    }

    $db->close();
    return array("success" => true, "messages" => "Success");
}

function insert_note($db){
    /*
     * Apparently MySQL converts strings to ints automatically,
     * so if I enter ('100', ...) as (id, ...) it's still ok
     * */
    $query = "INSERT INTO Notes (uid, title, text) VALUES " .
	     "(" . $_SESSION["id"] . ", " .
	     "'" . $db->real_escape_string($_POST["note_title"]) . "', " .
	     "'" . $db->real_escape_string($_POST["note_text"]) . "')";

    if ($result = $db->query($query))
	return array("success" => true, "messages" => array("Success"));

    return array("success" => false,
		 "messages" => array("MySQL error: " . $db->error));
}

function update_note($db){
    /*
     * Even if the note id is automatically added to the table,
     * someone might do a custom POST request with some bad
     * value, that's why it needs to be escaped.
     * */
    $query = "UPDATE Notes SET title='" .
	     $db->real_escape_string($_POST["note_title"]) .
	     "', text='" .
	     $db->real_escape_string($_POST["note_text"]) .
	     "' where id=" .
	     $db->real_escape_string($_POST["note_id"]);

    if ($result = $db->query($query))
	return array("success" => true, "messages" => array("Success"));

    return array("success" => false,
		 "messages" => array("MySQL error: " . $db->error));
}

function check_error_input(){
    $success = true;
    $messages = array();
    if (!$_POST["note_title"]){
	$messages[] = "Please enter a title";
	$success = false;
    }
    // for now note cannot be empty
    if (!$_POST["note_text"]){
	$messages[] = "Please enter some note text";
	$success = false;
    }
    return array("success" => $success, "messages" => $messages);
}
?>
