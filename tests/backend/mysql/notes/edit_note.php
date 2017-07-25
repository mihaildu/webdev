<?php
session_start();
if (!isset($_SESSION["id"])) {
    header("Location: login.php");
}
if (isset($_POST["submit_cancel"])){
    header("Location: index.php");
}

include("include/edit_base.php");
if (isset($_POST["submit_save"])){
    /*
     * For some weird reason, echoing hidden divs didn't work this time.
     * TODO figure out why, code looks absolutely identical to login.php
     * I had to go with the second approach and print divs in the right
     * place using php directly (and not javascript).
     * */
    $ret = attempt_save();
    if ($ret["success"]){
	header("Location: index.php");
    }
}
include("include/value_snippet.php");
?>
<!doctype html>
<html lang="en">
    <?php include("include/head.php"); ?>
    <body>
	<?php include("include/navbar.php");?>
	<div class="container">
	    <div class="row centered-row">
		<?php include("include/edit_note_form.php");?>
	    </div>
	    <?php
	    if (isset($ret))
		/*
		 * $ret["success"] should always be false if we reach this code
		 * I guess an extra check doesn't hurt
		 */
		if (!$ret["success"])
		    include("include/error_messages.php");
	    ?>
	</div>
	<?php include("include/scripts.php");?>
    </body>
</html>
