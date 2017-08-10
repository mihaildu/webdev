<?php
include_once("password.php");
include_once("connect.php");

function attempt_signup(){
    /*
     * These are the expected POST variables:
     *
     *   submit_signup: sign up button
     *
     *   username_signup: username to add to db
     *
     *   email_signup: the email address for user
     *
     *   password_signup: the password for the user; currently it's
     *     salted and hashed with sha256
     *
     * The credentials for db are hardcoded as well:
     *   server: localhost
     *   user: notes_user
     *   password: notes_password
     *   database: notes
     *   table (used to store users): Users
     *
     * The difference between this function and the one in mysql/signup.php
     * is that this one returns values and doesn't print anything. The
     * returned value is array("success", "messages") where "success" is a
     * bool value representing if the signup attempt was successful, and
     * messages is an array of strings.
     *
     * This function can be modified to echo messages instead (and, for
     * example be called from a javascript frontend code), but then
     * you would have to parse that file (read every line etc).
     * */

    // do nothing if bad input
    $ret = check_error_signup();
    if (!$ret["success"]){
	return array("success" => false, "messages" => $ret["messages"]);
    }

    // connect to db
    $ret = connect_to_db();
    if (!$ret["success"]){
	return array("success" => false, "messages" => $ret["messages"]);
    }
    $db = $ret["db"];

    // check if username exists
    $ret = username_exists($db);
    if (!$ret["success"]){
	$db->close();
	return array("success" => false, "messages" => $ret["messages"]);
    }

    // add entry to db
    // return at the end for maintainability
    $ret = add_to_db($db);
    if (!$ret["success"]){
	$db->close();
	return array("success" => false, "messages" => $ret["messages"]);
    }

    // display success message and clear post data
    // I only clear post data to remove stuff from forms
    // this can be done some other way
    unset($_POST["submit_signup"]);
    unset($_POST["username_signup"]);
    unset($_POST["email_signup"]);
    unset($_POST["password_signup"]);

    // close connection
    // should the connection to the db be kept alive?
    // until user leaves page
    // TODO check this
    // the redirect here should be done from js after some time
    $db->close();
    return array("success" => true,
		 "messages" => array("You successfully signed up"));
}

function check_error_signup(){
    $success = true;
    $messages = array();
    // form has username
    if (!$_POST["username_signup"]){
	$messages[] = "Please enter a username";
	$success = false;
    }

    // TODO enforce rules on username
    // no spaces, no special chars etc

    // form has email
    if (!$_POST["email_signup"]){
	$messages[] = "Please enter an email";
	$success = false;
    }

    // e-mail is in correct format
    // this is partially done in html as well
    if ($_POST["email_signup"] and !filter_var($_POST["email_signup"],
					       FILTER_VALIDATE_EMAIL)){
	$messages[] = "Please enter a valid email address";
	$success = false;
    }

    // form has password
    if (!$_POST["password_signup"]){
	$messages[] = "Please enter a password";
	$success = false;
    }
    return array("success" => $success, "messages" => $messages);
}

function username_exists($db){
    // username is taken from $_POST
    // TODO is real_escape_string enough
    $query = "select count(*) from Users where username = '" .
	     $db->real_escape_string($_POST["username_signup"]) . "'";
    if ($result = $db->query($query)){
	$cnt = $result->fetch_array()[0];
	if ($cnt != "0"){
	    return array("success" => false,
			 "messages" => array("Username already exists. " .
					     "Try a different one."));
	}
	$result->close();
    } else {
	return array("success" => false,
		     "messages" => array("Error retriving users: " .
					 $db->error));
    }
    return array("success" => true, "messages" => array("Success"));
}

function add_to_db($db){
    $query = salted_password_query($db);
    if ($result = $db->query($query)){
	return array("success" => true, "messages" => array("Success"));
    }
    return array("success" => false,
		 "messages" => array("MySQL error: " . $db->error));
}

function salted_password_query($db){
    // this is needed for hash_password
    $user_data = array("username" => $_POST["username_signup"],
		       "email" => $_POST["email_signup"],
		       "password" => $_POST["password_signup"]);

    return "insert into Users (username, email, password) values " .
	   "('" . $db->real_escape_string($_POST["username_signup"]) .
	   "', '" . $db->real_escape_string($_POST["email_signup"]) .
	   "', '" . hash_password($user_data) . "')";
}
?>
