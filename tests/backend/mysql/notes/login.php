<?php
session_start();
if (isset($_SESSION["id"])) {
   header("Location: index.php");
}

include("include/value_snippet.php");
include("include/login_base.php");
if (isset($_POST["submit_login"])){
    $ret = attempt_login();
    if ($ret["success"]){
	header("Location: index.php");
    } else {
	// print the messages in hidden divs
	$num_msgs = count($ret["messages"]);
	echo("<div id='login-messages' hidden>");
	for ($i = 0; $i < $num_msgs; $i++){
	    echo("<div class='login-message'>" . $ret["messages"][$i] .
		 "</div>");
	}
	echo("</div>");
    }
}
?>
<!doctype html>
<html lang="en">
    <?php include("include/head.php");?>
    <body>
	<?php include("include/navbar.php");?>
	<div class="container">
	    <div class="row centered-row">
		<?php include("include/login_form.php");?>
	    </div>
	    <div class="row">
		<div class="text-centered">
		    <div class="alert" id="messages">
		    </div>
		</div>
	    </div>
	</div>
	<?php include("include/scripts.php");?>
	<script src="js/login.js"></script>
    </body>
</html>
