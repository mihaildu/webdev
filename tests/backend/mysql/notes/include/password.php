<?php
define("SALT_STRING", "dlakjdadal");

function hash_password($user_data){
    /*
     * The current hashing method needs the following
     * fields in user_data: username, email, password
     *
     * TODO check with isset()
     * */
    $salt = SALT_STRING . $user_data["username"] .
	    $user_data["email"];

    /*
     * using sha256 (64 chars) won't complain on shorter
     * char fields (e.g. 40/41), but it won't store the
     * full string.
     * */
    return hash("sha256", $salt . $user_data["password"]);
}
?>
