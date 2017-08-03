<style type="text/css">
 .error {
     color: red;
 }
 .success {
     color: green;
 }
</style>

<?php
include("signup.php");
include("login.php");

// if user is already logged in
// redirect to user.php
session_start();
if (isset($_SESSION["id"])) {
    header("Location: user.php");
}

if (isset($_POST["submit_signup"])){
    attempt_signup();
}

if (isset($_POST["submit_login"])){
    attempt_login();
    /*
     * sometimes to avoid double post messages you can do a redirect
     * to the same page again (which will cause a GET request)
     *
     * instead of using $_POST variables to check if you want to print
     * something or to store messages to print (e.g. value_snippet)
     * use $_SESSION variables (so you have them there when you switch
     * from POST to GET)
     * */
    //header("Location: test2.php");
}
?>

<!-- sign up form -->
<form method="post">
    <!--
	 to avoid re-typing the name/e-mail/password
	 every time you get it wrong, add php;
	 this looks ugly
       -->
    <input type="text" name="username_signup"
	   placeholder="Username"
	   <?php
	   if(isset($_POST["submit_signup"]))
	       // the value is actually displayed in html
	       // so we need &quot; to display "
	       echo("value=\"" . htmlspecialchars($_POST["username_signup"])
	         . "\"");
	       //echo("value=\"" .
	       //   htmlspecialchars($_SESSION["username_signup"]) . "\"");
	   ?>>
    <input type="email" name="email_signup"
	   placeholder="Email Address"
	   <?php
	   if(isset($_POST["submit_signup"]))
	       echo("value=\"" . htmlspecialchars($_POST["email_signup"])
		  . "\"");
	   ?>>
    <input type="password" name="password_signup"
	   placeholder="Password"
	   <?php
	   if(isset($_POST["password_signup"]) and
	       $_POST["password_signup"] != "")
	   echo("value=\"" . $_POST["password_signup"] . "\"");
	   ?>>
    <input type="submit" value="Sign Up" name="submit_signup">
</form>

<!-- log in form -->
<form method="post">
    <input type="text" name="username_login"
	   placeholder="Username"
    	   <?php
	   if(isset($_POST["submit_login"]))
	       echo("value=\"" . htmlspecialchars($_POST["username_login"])
		  . "\"");
	   ?>>
    <input type="password" name="password_login"
	   placeholder="Password"
    	   <?php
	   if(isset($_POST["submit_login"]) and
	       $_POST["password_login"] != "")
	   echo("value=\"" . $_POST["password_login"] . "\"");
	   ?>>
    <input type="submit" value="Log In" name="submit_login">
</form>
