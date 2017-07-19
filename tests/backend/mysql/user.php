<?php
session_start();
if (!isset($_SESSION["id"])) {
?>
    <p>
	You are not logged in! Click
	<a href="test2.php">here</a> to log in.
    </p>
<?php
    return;
}
?>

<p>
    Hello <b><?php echo(htmlspecialchars($_SESSION["username"])); ?></b>,
    this is the information we have about you:<br><br>
    <?php
    echo("Your id: " . $_SESSION["id"] . "<br>");
    echo("Your email: " . $_SESSION["email"] . "<br>");
    echo("Your hashed password: " . $_SESSION["password"] . "<br>");
    ?>
</p>

<form method="post" action="logout.php">
    <input type="submit" value="Log Out" name="submit_logout">
</form>
