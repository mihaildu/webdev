<!--
     div with error messages that is included only if something fails
     (e.g. $ret["success"] = false)
   -->
<div class="row">
    <div class="text-centered" class="testx">
	<div class="alert alert-danger" id="error-messages">
	    <?php
	    foreach ($ret["messages"] as $key => $value) {
		echo("<div class='error-message'>" . $value . "</div>");
	    }
	    ?>
	</div>
    </div>
</div>
