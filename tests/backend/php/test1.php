<!-- TODO a lot of this stuff should be moved to php_only -->
<!doctype html>
<html lang="en">
    <head>
	<meta charset="utf-8"/>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<meta name="description" content="This site is all about tests"/>
	<meta name="keywords" content="test, tests"/>
	<title>PHP Examples</title>
	<link rel="stylesheet" type="text/css" href="test1.css">
    </head>
    <body>
	<!-- new identation thanks to web-mode -->
	Manual:<br>
	<a href="http://php.net/manual/en/">php.net</a>
	<br>

	Tutorials:<br>
	<a href="http://php.net/manual/en/tutorial.php">php.net</a><br>
	<a href="https://www.w3schools.com/php/">w3schools</a>
	<br>

	Refs:<br>
	<a href="http://php.net/manual/en/langref.php">langref</a><br>
	<a href="http://php.net/manual/en/funcref.php">funcref</a><br>
	<br>

	<!-- to play around with _GET, _POST -->
	<form method="get">
	    <input type="text" name="my_get_val"
		   placeholder="This form uses GET">
	    <input type="submit">
	</form>
	<br>
	<form method="post">
	    <input type="text" name="my_post_val"
		   placeholder="This form uses POST">
	    <input type="submit">
	</form>
	<br>
	<!--
	     this is a php section
	     this will be run on server before sending the html to the client
	   -->
	<?php

	// this shows info about php version
	//phpinfo();

	// this is a variable
	$a = 10;

	// everything that's printed will be added to the document
	// in this area (where php is)
	echo("a = ");
	echo($a);
	echo("<br>");

	// type of obj
	echo("type of a = " . gettype($a) . "<br>");

	// same thing with one echo
	$b = 5;
	$c = $a + $b;
	echo("c = " . $c . "<br>");

	// this also works
	echo "hello<br>";

	// you can also use print function
	print("hello 2<br>");

	// you can print info on variables with var_dump
	echo("var_dump(a) = ");
	var_dump($a);
	echo("<br>");

	// concatenating 2 strings with dot
	echo("string1 " . "string2<br>");

	// so this also works in php
	$var1 = "this is var 1";
	$var2 = "var1";
	// this is $($var2) = $var1
	echo($$var2 . "<br>");

	// this is a function
	function my_func($a, $b){
	    return($a + $b);
	}
	echo(my_func(10, 20)."<br>");

	// this is an array
	// arrays are like dictionaries in php
	$a = array(3, 4);

	// for loop
	for ($i = 0; $i < 2; $i++) {
	    echo($a[$i] . " ");
	}
	echo("<br>");

	// another for loop
	foreach ($a as $key => $value) {
	    echo("key " . $key . " => " . $value . "<br>");
	}

	// length of array is count($a) or sizeof($a)

	// this will also work
	// foreach ($a as $key)

	// while loop
	$i = 0;
	while ($i < 10) {
	    $i = $i + 1;
	}
	echo("i = " . $i . "<br>");

	// this is also an array
	$a = array(0 => 1, 1 => 2);
	echo("a[0] = " . $a[0] . "<br>");
	echo("a[1] = " . $a[1] . "<br>");

	// adding an element at the end
	$a[] = 100;

	// you can also print arrays like this
	print_r($a);
	echo("<br>");

	// removing a given element
	unset($a[2]);
	print_r($a);
	echo("<br>");

	// sorting some array
	$arr = array(7, 5, 6, 3, 2, 1, 9, 10);
	sort($arr);
	print_r($arr);
	echo("<br>");

	// you can unset variables too
	$var3 = 77;
	unset($var3);
	// this will generate an error
	//echo($var3 . "<br>");

	// if statement example
	$a = 2;
	$b = 3;
	if ($a == 2 && $b == 3) {
	    echo("if statement<br>");
	}
	if ($a == 2 and $b == 5)
	    echo("if statement 2<br>");

	// cookies are variables stored on client machine
	// you can access/use them with _COOKIE variable
	echo("all cookies = ");
	print_r($_COOKIE);
	echo("<br>");

	// this doesn't seem to store them from session to session
	$_COOKIE[0] = 10;
	$_COOKIE["my_cookie"] = "my_val";

	// proper way to use cookies
	// try this from visit to visit
	if (isset($_COOKIE["last_visit"]))
	    echo("your last visit: " . $_COOKIE["last_visit"] . "<br>");
	setcookie("last_visit", date("l jS \of F Y h:i:s A"));

	// session works like cookies and it's used for logins
	// you store login variables there
	// this also sets a session id in cookies
	session_start();
	// this will keep getting increment until the session ends
	// e.g. logout
	if (isset($_SESSION["svar"]))
	    $_SESSION["svar"] = $_SESSION["svar"] + 1;
	else
	    $_SESSION["svar"] = 1;
	print_r($_SESSION);
	echo("<br>");

	// this will end the session
	//session_destroy();

	// this will free all variables stored in the session
	//session_unset();

	// you can print session id like this as well
	// instead of using cookies
	echo(session_id() . "<br>");

	// you can include other files
	include("test2.php");
	echo($local_var . "<br>");
	local_function();

	// other way of dealing with dates
	$now = new DateTime();
	echo($now->format("Y-m-d") . "<br>");

	// other special variables
	// _GET, _POST
	// apparently you can have both in the same request what
	// maybe it's post with a path that forces a get
	echo("GET array = ");
	print_r($_GET);
	echo("<br>");
	echo("POST array = ");
	print_r($_POST);
	echo("<br>");

	// this will escape special characters
	echo(htmlspecialchars("Jon & Jim<br>") . "<br>");

	// casts str <-> int
	echo((int)"10" + 12 . "<br>");
	echo((string)17 . "<br>");

	// apply md5 to some text
	echo("md5(\"admin123\") = " . md5("admin123") . "<br>");
	$salt = "lkdjdla921l";
	echo("salted md5(\"admin123\") = " . md5($salt . "admin123") .
	     "<br>");



	// TODO _FILES

	// sending an e-mail
	// this needs sendmail installed
	// also, this takes a while
	function send_email(){
	    $dest_email = "unlucky_dude@yahoo.com";
	    $subj = "hello from php";
	    $body = "this is an e-mail from php";
	    $header = "From: famous@celebrity.com";
	    if (mail($dest_email, $subj, $body, $header))
		echo("mail sent<br>");
	    else
		echo("mail not sent<br>");
	}

	// this is the official example
	function send_email2(){
	    $message = "Line 1\r\nLine 2\r\nLine 3";
	    $message = wordwrap($message, 70, "\r\n");
	    $ret = mail('unlucky_dude@yahoo.com', 'My Subject', $message);
	    if ($ret)
		echo("mail sent<br>");
	    else
		echo("mail not sent");
	}

	//send_email2();
	//send_email2();
	?>

	<!-- you can also mix php with html -->
	<!-- this looks stupid tbh -->
	<?php
	$x = 10;
	if ($x == 10) {
	?>
	    <p>x is 10</p>
	<?php
	} else {
	?>
	    <p>x is not 10</p>
	<?php
	}
	?>

    </body>
</html>
