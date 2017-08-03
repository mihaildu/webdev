<!--
     same as "error_messages.php", but messages are taken from SESSION variable
   -->
<div class="row">
    <div class="text-centered">
	<div class="alert alert-danger" id="error-messages">
	    <?php
	    foreach ($_SESSION["messages"] as $key => $value) {
		echo("<div class='error-message'>" . $value . "</div>");
	    }
	    ?>
	</div>
    </div>
</div>
