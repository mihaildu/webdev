function show_messages(div_name, alert_class){
    if ($(div_name).length == 0)
	return;

    // individual messages can be selected with '.login-message'
    var login_messages = $(div_name).html();
    $("#messages").html(login_messages);

    // TODO revert back to none/remove class after this
    // do I need to? on every login.php load it applies the css
    $("#messages").addClass(alert_class);
    $("#messages").css("display", "inline-block");
}
