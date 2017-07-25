<?php
function value($post_check, $post_val){
    /*
     * Function that updates the value attribute for an input element.
     * Not the nicest implementation, it will look at the POST variables
     * determined by $post_check and $post_val.
     *
     * This won't work for password inputs. For that, use value_password().
     *
     * E.g. value("submit_login", "username_login")
     *   "submit_login": name for the submit input element
     *   "username_login": name for the text input element
     * */
    if (isset($_POST[$post_check]))
	echo("value=\"" . str_replace("\"", "&quot;", $_POST[$post_val]) .
	     "\"");
}

function value_password($post_check, $post_val){
    /*
     * Same as value(), but works for password inputs.
     * In the end, this might be better off cleared on error.
     * */
    if (isset($_POST[$post_check]) and $_POST[$post_val] != "")
	echo("value=\"" . str_replace("\"", "&quot;", $_POST[$post_val]) .
	     "\"");
}

function value_note(){
    /*
     * Function that sets the inner HTML of the textarea element on
     * edit_table. This doesn't require "value=" or htmlspecialchars.
     * */
    // TODO show newlines, "&#13;&#10;"
    if (isset($_POST["note_text"]))
	echo($_POST["note_text"]);
}

function value_action(){
    /*
     * Function that sets the value attribute for the action input.
     * This propagates the action value. First you get to "edit_note.php"
     * in some way (action could be "add" or "edit") and then when you save
     * the value must be propagated so the right SQL operation is executed
     * (e.g. insert vs update).
     * */
    if(isset($_POST["action"]))
	echo("value=" . $_POST["action"]);
    else
	echo("value='add'");
}
?>
