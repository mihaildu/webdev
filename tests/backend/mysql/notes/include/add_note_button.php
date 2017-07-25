<!-- this is only called on index.php which assumes the user is logged in -->
<div id="add-note">
    <form method="post" action="edit_note.php">
	<input type="submit" value="+" name="add_note"
	       class="btn btn-default" id="add-note-btn">
	<!--
	     edit_note is used for both adding
	     new notes and editing old ones

	     in a way this is a bit useless but the code looks better
	     (I can always check if the + button was clicked instead)
	   -->
	<input type="hidden" name="action" value="add">
    </form>
</div>
