<?php
/*
 * This can be done the old C way, but
 * you have to put your entire code in
 * an if statement:
 *
 * inside password.php:
 *
 * if(!defined("PASSWORD_PHP")){
 *   define("PASSWORD_PHP", true);
 *   ...
 * }
 * */
include_once("password.php");

function attempt_signup(){
    /*
     * For now this function is hardcoded.
     * These are the expected POST variables:
     *
     *   submit_signup: sign up button (e.g. this function
     *     should be called if this variable is set; it will
     *     be unset in this function)
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
     * No reason to make this generic since I won't be really using
     * PHP that much. This is just a test.
     * */

    // do nothing if bad input
    if (check_error_signup()){
	echo("<br>");
	return;
    }

    // connect to db
    $db = new mysqli("localhost", "notes_user", "notes_password", "notes");
    if($db->connect_errno){
	echo("<div class='error'>Error connecting to the DB</div><br>");
	return;
    }

    // check if username exists
    if (username_exists($db)){
	$db->close();
	return;
    }

    // add entry to db
    // return at the end for maintainability
    if (!add_to_db($db)){
	$db->close();
	return;
    }

    // display success message and clear post data
    // I only clear post data to remove stuff from forms
    // this can be done some other way
    echo("<div class='success'>You successfully signed up</div><br>");
    unset($_POST["submit_signup"]);
    unset($_POST["username_signup"]);
    unset($_POST["email_signup"]);
    unset($_POST["password_signup"]);

    // close connection
    // should the connection to the db be kept alive?
    // until user leaves page
    // TODO check this
    $db->close();
}

function check_error_signup(){
    $err = false;
    // form has username
    if (!$_POST["username_signup"]){
	echo("<div class='error'>Please enter a username</div>");
	$err = true;
    }

    // TODO enforce rules on username
    // no spaces, no special chars etc

    // form has email
    if (!$_POST["email_signup"]){
	echo("<div class='error'>Please enter an email</div>");
	$err = true;
    }

    // e-mail is in correct format
    // this is partially done in html as well
    if ($_POST["email_signup"] and !filter_var($_POST["email_signup"],
					       FILTER_VALIDATE_EMAIL)){
	echo("<div class='error'>Please enter a valid email address</div>");
	$err = true;
    }

    // form has password
    if (!$_POST["password_signup"]){
	echo("<div class='error'>Please enter a password</div>");
	$err = true;
    }
    return $err;
}

function username_exists($db){
    // username is taken from $_POST
    // TODO is real_escape_string enough
    $query = "select count(*) from Users where username = '" .
	     $db->real_escape_string($_POST["username_signup"]) . "'";
    if ($result = $db->query($query)){
	$cnt = $result->fetch_array()[0];
	if ($cnt != "0"){
	    echo("<div class='error'>Username already exists. " .
		 "Try a different one.</div><br>");
	    return true;
	}
	$result->close();
    } else {
	echo("<div class='error'>Error retriving users: " . $db->error .
	     "</div><br>");
	return true;
    }
    return false;
}

function add_to_db($db){
    //$query = non_escaped_query();
    //$query = password_query($db);
    $query = salted_password_query($db);
    if ($result = $db->query($query)){
	return true;
    }

    // $db->insert_id has the id for the newly inserted item
    // TODO why do I care? remove this
    echo("<div class='error'>MySQL error: " . $db->error . "</div><br>");
    return false;
}

function non_escaped_query(){
    /*
     * using this as username on a non-escaped query
     * didn't actually delete the record:
     *
     * user', 'mail@mail.com', 'pass'); delete from Users where
     *     username = 'jim';
     *
     * TODO try to break more
     * */
    return "insert into Users (username, email, password) values " .
	   "('" . $_POST["username_signup"] .
	   "', '" . $_POST["email_signup"] .
	   "', PASSWORD('" . $_POST["password_signup"] . "'))";
}

function password_query($db){
    /*
     * This uses the PASSWORD() function from MySQL to hash
     * the password.
     *
     * PASSWORD() produces a hash for the password strings
     * the algorithm used depends on the value of old_passwords (global var)
     * old_passwords:
     *   1 - original/pre-4.1 hashing - mysql_old_password()
     *   0 - MySQL 4.1 hashing - mysql_native_password()
     *   2 - sha256_password
     *
     * the 4.1 hashing is not salted, it's just sha1(bin(sha1(text)))
     * more about this in php_only/test1.php:test5_hashing
     * TODO move test5_hashing some place else
     * */
    return "insert into Users (username, email, password) values " .
	   "('" . $db->real_escape_string($_POST["username_signup"]) .
	   "', '" . $db->real_escape_string($_POST["email_signup"]) .
	   "', PASSWORD('" . $_POST["password_signup"] . "'))";
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
