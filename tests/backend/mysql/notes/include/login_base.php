<?php
include_once("password.php");

function attempt_login(){
    /*
     * These are the expected POST variables:
     *
     *   submit_login: log in button
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
     * The difference between this function and the one in mysql/login.php
     * is that this one returns values and doesn't print anything. The
     * returned value is array("success", "messages") where "success" is a
     * bool value representing if the login attempt was successful, and
     * messages is an array of strings.
     *
     * This function can be modified to echo messages instead (and, for
     * example be called from a javascript frontend code), but then
     * you would have to parse that file (read every line etc).
     * */
    if (!isset($_SESSION))
	session_start();

    // check input
    $ret = check_error_login();
    if(!$ret["success"]){
	return array("success" => false, "messages" => $ret["messages"]);
    }

    // connect to db
    $db = new mysqli("localhost", "notes_user", "notes_password", "notes");
    if($db->connect_errno){
	return array("success" => false,
		     "messages" => array("Error connecting to the DB"));
    }

    // check if credentials are ok
    $ret = check_credentials($db);
    if (!$ret["success"]){
	$db->close();
	return array("success" => false, "messages" => $ret["messages"]);
    }

    $db->close();
    return array("success" => true, "messages" => "Success");
}

function check_error_login(){
    /*
     * For now just check if username
     * or password field is empty.
     * */
    $success = true;
    $messages = array();
    if (!$_POST["username_login"]){
	$messages[] = "Please enter a username";
	$success = false;
    }
    if (!$_POST["password_login"]){
	$messages[] = "Please enter a password";
	$success = false;
    }
    return array("success" => $success, "messages" => $messages);
}

function check_credentials($db){
    /*
     * Assumes the following fields:
     *   id, username, email, password
     * */
    $query = "select * from Users where username = '" .
	     $db->real_escape_string($_POST["username_login"]) . "'";
    if ($result = $db->query($query)){
	// assumes only one user for a name
	// this check happens at sign up
	if ($result->num_rows < 1){
	    // this can be changed to "Username doesn't exist"
	    return array("success" => false,
			 "messages" => array("Bad login details"));
	}
	$row_data = $result->fetch_array();
	$result->close();

	// check password
	$user_data = array("username" => $_POST["username_login"],
			   "email" => $row_data["email"],
			   "password" => $_POST["password_login"]);

	if ($row_data["password"] != hash_password($user_data)){
	    // this can be changed to "Bad password for user"
	    return array("success" => false,
			 "messages" => array("Bad login details"));
	}

	// save info in session variables
	// this could be done with a for instead of hardcoding
	$_SESSION["id"] = $row_data["id"];
	$_SESSION["username"] = $row_data["username"];
	$_SESSION["email"] = $row_data["email"];
	$_SESSION["password"] = $row_data["password"];
    } else {
	return array("success" => false,
		     "messages" => array("Error retriving users: " .
					 $db->error));
    }
    return array("success" => true, "messages" => array("Success"));
}
?>
