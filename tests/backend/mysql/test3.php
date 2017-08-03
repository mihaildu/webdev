<!--
     this is the same as login from test2.php but the error messages
     are diplayed using SESSION variables; this is done to avoid the
     "confirm form resubmission" message that is not user friendly

     so when an error message is generated, it is saved in a SESSION var
     and the user gets redirected to the same page using GET.
   -->

<?php
session_start();
include("notes/include/value_snippet_session.php");
include("notes/include/login_base.php");

if (isset($_POST["submit_login"])){
    $ret = attempt_login();
    if ($ret["success"]){
	header("Location: user.php");
	return;
    }

    /* save messages in SESSION variable */
    $_SESSION["submit_login"] = true;
    $_SESSION["messages"] = $ret["messages"];
    if (isset($_POST["username_login"]))
	$_SESSION["username_login"] = $_POST["username_login"];
    if (isset($_POST["password_login"]))
	$_SESSION["password_login"] = $_POST["password_login"];
    header("Location: test3.php");
    return;
}
?>

<style type="text/css">
 .error-message {
     color: red;
 }
</style>

<!-- just log in form -->
<form method="post">
    <input type="text" name="username_login"
	   placeholder="Username"
	   <?php
	   value("submit_login", "username_login");
	   ?>>
    <input type="password" name="password_login"
	   placeholder="Password"
	   <?php
	   value_password("submit_login", "password_login");
	   ?>>
    <input type="submit" value="Log In" name="submit_login">
</form>

<?php
if (isset($_SESSION["messages"])) {
    include("notes/include/error_messages_session.php");
    /* flash effect */
    unset($_SESSION["messages"]);
    /* TODO unset submit_login etc? or unset session? */
}
?>
