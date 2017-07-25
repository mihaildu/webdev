<div class="col-md-6 col-md-offset-3" id="edit-note-form">
    <form method="post">
	<!-- title -->
	<div class="form-group">
	    <input type="text" name="note_title"
		   placeholder="Title" class="form-control"
		   <?php
		   value("note_title", "note_title");
		   ?>>
	</div>

	<!-- note text -->
	<div class="form-group">
	    <textarea name="note_text" placeholder="Your note..."
		      class="form-control"
		      rows="10"><?php value_note();?></textarea>
	</div>

	<!-- buttons -->
	<input type="submit" value="Save"
	       name="submit_save" class="btn btn-default">
	<input type="submit" value="Cancel"
	       name="submit_cancel" class="btn btn-default">
	<input type="hidden" name="action"
	       <?php value_action();?>>
	<input type="hidden" name="note_id"
	       <?php value("note_id", "note_id");?>>
    </form>
</div>
