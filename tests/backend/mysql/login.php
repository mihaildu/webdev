<?php
include_once("password.php");

function attempt_login(){
    /*
     * For now this function is hardcoded.
     * These are the expected POST variables:
     *
     *   submit_login: log in button (e.g. this function
     *     should be called if this variable is set; it will
     *     be unset in this function TODO)
     *
     *   username_login: username in the db
     *
     *   password_login: the password for the user in the db
     *
     * The credentials for db are hardcoded:
     *   server: localhost
     *   user: notes_user
     *   password: notes_password
     *   database: notes
     *   table (used to store users): Users
     *
     * No reason to make this generic since I won't be really using
     * PHP that much. This is just a test.
     * */

    // this just gives access to SESSION var
    if (!isset($_SESSION))
	session_start();

    // check input
    if(check_error_login()){
	echo("<br>");
	return;
    }

    // connect to db
    $db = new mysqli("localhost", "notes_user", "notes_password", "notes");
    if($db->connect_errno){
	echo("<div class='error'>Error connecting to the DB</div><br>");
	return;
    }

    // check if credentials are ok
    if (bad_credentials($db)){
	$db->close();
	return;
    }

    $db->close();
    // redirect to logged in page
    header("Location: user.php");
}

function check_error_login(){
    /*
     * For now just check if username
     * or password field is empty.
     * */
    $err = false;
    if (!$_POST["username_login"]){
	echo("<div class='error'>Please enter a username to login</div>");
	$err = true;
    }
    if (!$_POST["password_login"]){
	echo("<div class='error'>Please enter a password to login</div>");
	$err = true;
    }
    return $err;
}

function bad_credentials($db){
    /*
     * Assumes the following fields:
     *   id, username, email, password
     *
     * Ways to break up login without sanitizing the input.
     * x' OR '1' = '1
     *   this won't work here however because of the way I log in
     * x' delete from notes.Users where name = 'user11';
     *   I don't know why this doesn't work
     * */
    $query = "select * from Users where username = '" .
	     $db->real_escape_string($_POST["username_login"]) . "'";

    if ($result = $db->query($query)){
	// assumes only one user for a name
	// this check happens at sign up
	if ($result->num_rows < 1){
	    // this can be changed to "Username doesn't exist"
	    echo("<div class='error'>Bad login details</div><br>");
	    return true;
	}
	$row_data = $result->fetch_array();
	$result->close();

	// check password
	$user_data = array("username" => $_POST["username_login"],
			   "email" => $row_data["email"],
			   "password" => $_POST["password_login"]);

	if ($row_data["password"] != hash_password($user_data)){
	    // this can be changed to "Bad password for user"
	    echo("<div class='error'>Bad login details</div><br>");
	    return true;
	}

	// save info in session variables
	// this could be done with a for instead of hardcoding
	$_SESSION["id"] = $row_data["id"];
	$_SESSION["username"] = $row_data["username"];
	$_SESSION["email"] = $row_data["email"];
	$_SESSION["password"] = $row_data["password"];
    } else {
	echo("<div class='error'>Error retriving users: " . $db->error .
	     "</div><br>");
	return true;
    }
    return false;
}
?>
