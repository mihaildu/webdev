<?php
/*
 * This is similar to value_snippet.php, but it looks at session variables
 * rather than POST ones. This allows us to switch from POST to GET so
 * that the user doesn't get the "confirm to submit" message.
 */
function value($session_check, $session_val){
    /*
     * Function that updates the value attribute for an input element.
     * Not the nicest implementation, it will look at the SESSION variables
     * determined by $session_check and $session_val.
     *
     * This won't work for password inputs. For that, use value_password().
     *
     * As far as I noticed, the only thing needed here is to escape double
     * quotes ", so str_replace was doing just fine. However, htmlentities
     * seems to be the recommended function for this purpose so I went with
     * that. I kept my old str_replace implementation in value_str_replace().
     *
     * E.g. value("submit_login", "username_login")
     *   "submit_login": name for the submit input element
     *   "username_login": name for the text input element
     * */
    if (isset($_SESSION[$session_check]))
	echo("value=\"" . htmlentities($_SESSION[$session_val]) . "\"");
}

function value_password($session_check, $session_val){
    /*
     * Same as value(), but works for password inputs.
     * In the end, this might be better off cleared on error.
     *
     * This needs an additional check for empty password field.
     * */
    if (isset($_SESSION[$session_check]) and $_SESSION[$session_val] != "")
	echo("value=\"" . htmlentities($_SESSION[$session_val]) . "\"");
}
?>
