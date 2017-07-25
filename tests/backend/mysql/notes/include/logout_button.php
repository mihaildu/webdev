<?php
// session should be started already on every page
if (!isset($_SESSION["id"])) {
    return;
}
?>
<div id="logout">
    <form method="post" action="logout.php">
	<input type="submit" value="Log Out" name="submit_logout"
	       class="btn btn-default">
    </form>
</div>
