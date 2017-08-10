<?php
/*
 * Table with all the data in Notes.
 *
 * TODO Maybe it's better to use one connection.
 * */
include_once("connect.php");
$ret = connect_to_db();
if (!$ret["success"]){
    echo("<div class='text-centered'>" .
	 "<div class='alert alert-danger' id='table-message'>" .
	 "Error connecting to the DB" .
	 "</div></div>");
    return;
}
$db = $ret["db"];

show_table($db);
$db->close();

function show_table($db){
    // assumes the user is already logged in
    // might add a sanity check
    $query = "select * from Notes where uid = " . $_SESSION["id"];
    if ($result = $db->query($query)){
	echo("<div id='notes-table-container' class='centered'>");
	echo("<table class='table table-bordered table-hover' " .
	     "id='notes-table'>");

	// hardcode headers to look nicer
	echo("<tr class='active'>");
	echo("<th hidden>Note ID</th>");
	echo("<th>Edit</th>");
	echo("<th>Delete</th>");
	echo("<th>Title</th>");
	echo("<th>Note</th>");
	echo("</tr>");

	// if no notes available, show info
	if ($result->num_rows == 0){
	    echo("<tr><td colspan='4' class='text-centered'>You have no " .
		 "notes. Click on + to add a note.</td></table>");
	    include("include/add_note_button.php");
	    return;
	}

	// num_cols is kinda useless here
	$num_cols = $result->field_count;
	for ($row = 0; $row < $result->num_rows; $row++){
	    $row_data = $result->fetch_array();
	    // again hardcoded for nicer look
	    echo("<tr>");
	    // note id
	    echo("<td class='note-id' hidden>" .
		 $row_data["id"] .
		 "</td>");
	    // edit & delete icons
	    echo("<td class='edit'>" .
		 "<a>" .
		 "<span class='glyphicon glyphicon-edit'>" .
		 "</span>" .
		 "</a>" .
		 "</td>");
	    echo("<td class='delete'>" .
		 "<a>" .
		 "<span class='glyphicon glyphicon-remove'>" .
		 "</span>" .
		 "</a>" .
		 "</td>");
	    // title & note text
	    echo("<td class='note-title'>" .
		 htmlspecialchars($row_data["title"]) . "</td>");
	    echo("<td class='note-text'>" .
		 htmlspecialchars($row_data["text"]) . "</td>");
	    echo("</tr>");
	}
	echo("</table>");

	// the add note button - part of the table
	include("include/add_note_button.php");
	echo("</div>"); // notes-table-container
	$result->close();
    } else {
	echo("<div class='text-centered'>" .
	     "<div class='alert alert-danger' id='table-message'>" .
	     "Error retrieving notes" .
	     "</div></div>");
    }
}
?>
