<?php
session_start();
if (!isset($_SESSION["id"])) {
    header("Location: login.php");
}
?>
<!doctype html>
<html lang="en">
    <?php include("include/head.php"); ?>
    <body>
	<?php include("include/navbar.php");?>
	<div class="container">
	    <div class="row centered-row">
		<?php include("include/table.php");?>
	    </div>
	</div>
	<?php include("include/edit_action.php");?>
	<?php include("include/delete_action.php");?>
	<?php include("include/scripts.php");?>
	<script src="js/table.js"></script>
    </body>
</html>
