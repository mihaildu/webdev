$(document).ready(set_handlers);

function set_handlers(){
    set_edit_handlers();
    set_delete_handlers();
}

function set_edit_handlers(){
    var edit_fields = $(".edit");
    for(var i in edit_fields){
	edit_fields.eq(i).click(edit_note);
    }
}

function set_delete_handlers(){
    var delete_fields = $(".delete");
    for(var i in delete_fields){
	delete_fields.eq(i).click(delete_note);
    }
}

function edit_note(){
    /*
     * This is the row: $(this).parent()
     * These are the others tds in the row: $(this).siblings()
     * siblings() exclude this element
     * siblings(".class") selects only the siblings with .class
     *
     * The whole note-text will be sent via POST. Alternatively
     * you can send only the note-id (and note-title) and
     * query the db again.
     */
    var note_id = $(this).siblings(".note-id").html();
    var note_title = $(this).siblings(".note-title").html();
    var note_text = $(this).siblings(".note-text").html();

    // submit to form
    $("#edit-note-id").val(note_id);
    $("#edit-note-title").val(note_title);
    // both val() and html() seem to work for textarea
    $("#edit-note-text").html(note_text);

    // TODO solve for </textarea>
    //$("#edit-note-text").html("test<br>&lt;/textarea><br>ddada");

    // both trigger("submit") and submit() work
    $("#edit-form").submit();
}

function delete_note(){
    var note_id = $(this).siblings(".note-id").html();

    // submit to form
    $("#delete-note-id").val(note_id);
    $("#delete-form").submit();
}
