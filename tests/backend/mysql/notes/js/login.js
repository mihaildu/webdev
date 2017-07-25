$(document).ready(show_login_messages);

function show_login_messages(){
    // show_messages is in notes.js
    // no inclusion needed because both files are used on the same page
    show_messages("#login-messages", "alert-danger");
}
