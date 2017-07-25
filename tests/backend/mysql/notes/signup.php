<?php
session_start();
include("include/value_snippet.php");
include("include/signup_base.php");
if (isset($_POST["submit_signup"])){
    $ret = attempt_signup();
    if ($ret["success"]){
	echo("<div id='signup-success' hidden></div>");
	// keep the same style for consistency
	echo("<div id='signup-messages' hidden>" .
	     "<div class='signup-message'>You successfully signed up!" .
	     "</div></div>");
    } else {
	$num_msgs = count($ret["messages"]);
	echo("<div id='signup-messages' hidden>");
	for ($i = 0; $i < $num_msgs; $i++){
	    echo("<div class='signup-message'>" . $ret["messages"][$i] .
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
		<?php include("include/signup_form.php");?>
	    </div>
	    <div class="row">
		<div class="text-centered">
		    <div class="alert" id="messages">
		    </div>
		</div>
	    </div>
	</div>
	<?php include("include/scripts.php");?>
	<script src="js/signup.js"></script>
    </body>
</html>
