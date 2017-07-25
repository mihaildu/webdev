$(document).ready(show_signup_messages);

function show_signup_messages(){
    // show_messages is in notes.js
    // no inclusion needed because both files are used on the same page
    if ($("#signup-success").length == 0)
	return show_messages("#signup-messages", "alert-danger");

    show_messages("#signup-messages", "alert-success");
    setTimeout(function(){window.location = "login.php";}, 3000);
}
