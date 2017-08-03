<style type="text/css">
 table {
     border-collapse: collapse;
 }
 td, th {
     border: 1px solid black;
     padding: 8px;
 }
</style>

<body>
    <!-- using php to connect to db -->
    <?php

    /*
     * three way to access MySQL in PHP
     *   * old (legacy) mysql_ routines
     *   * new mysqli_ routines (procedural & oop style)
     *   * pdo (portable data objects)
     * */

    //mysql_procedural();
    //mysql_oop();
    mysql_pdo();

    function mysql_pdo() {
	// pdo("connection", "username", "password")
	$db = new pdo("mysql:host=localhost;dbname=testing", "root", "root");

	/*
	 * PDO::ATTR_ERRMODE = error reporting mode
	 * PDO::ERRMODE_EXCEPTION = throw exceptions
	 * other options:
	 *   * PDO::ERRMODE_SILENT = set error codes
	 *   * PDO::ERRMODE_WARNING = raise E_WARNING
	 * */
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	// run a query
	//fetch1($db);
	fetch2($db);

	/*
	 * you can also run queries (e.g. delete) with prepare & execute
	 * TODO check this
	   $query = "select host, user from mysql.user where host = :hst";
	   $result = $db->prepare($query);

	   this will replace the :hst with a value (and escape stuff)
	   $result->execute(array(":hst" => $_POST["host"]));
	   $row = $result->fetch(PDO::FETCH_ASSOC);
	 */

	// closing the connection?
    }

    function fetch2($db) {
	/* other way of iterating through results */
	$query = "select host, user from mysql.user";
	$result = $db->query($query);

	echo("<table>");
	echo("<tr><th>Host</th><th>User</th></tr>");
	while($row = $result->fetch(PDO::FETCH_ASSOC)) {
	    echo("<tr>");
	    echo("<td>" . htmlentities($row["host"]) . "</td>");
	    echo("<td>" . htmlentities($row["user"]) . "</td>");
	    echo("</tr>");
	}
	echo("</table><br>");
    }

    function fetch1($db) {
	$query = "select host, user from mysql.user";
	$result = $db->query($query);

	echo("<table>");
	echo("<tr><th>Host</th><th>User</th></tr>");
	foreach ($result as $row) {
	    echo("<tr>");
	    echo("<td>" . htmlentities($row["host"]) . "</td>");
	    echo("<td>" . htmlentities($row["user"]) . "</td>");
	    echo("</tr>");
	}
	echo("</table><br>");
	//$row = $result->fetch(PDO::FETCH_ASSOC);
    }

    function mysql_procedural(){
	// host, user, password, db name
	// plain text password
	$link = mysqli_connect("localhost", "root", "root", "testing");

	// other way of displaying errors
	// if you have display error off
	//echo(mysqli_connect_error());

	if (!$link){
	    // instead of \n you can use PHP_EOL
	    // this works if you run like script like "php script.php"
	    // other constants PHP_VERSION
	    // TODO move this in php/test1.php

	    echo("Unable to connect to MySQL DB" . "<br>");
	    echo("Debugging error: " . mysqli_connect_error() . "<br>");
	    echo("Debugging errno: " . mysqli_connect_errno() . "<br>");

	    // you can also return from the script with exit()
	    // or die(message)
	    exit;
	}

	echo("Successfully connected to the DB" . "<br>");
	echo("Host information: " . mysqli_get_host_info($link) . "<br>");
	echo("<br>");

	// querying the db
	// $result is an object
	// this is from a different db (mysql) but still works
	$query = "select host, user from mysql.user";
	$result = mysqli_query($link, $query);
	// this is the same object mysql_oop()

	// you can also use external/static functions
	// use mysqli_ as prefix
	// starting data_seek is 0, then it gets incremented
	echo("Num rows in mysql.user: " . mysqli_num_rows($result) . "<br>");
	echo("First row: ");
	print_r(mysqli_fetch_array($result));
	echo("<br>");
	echo("Second row: ");
	print_r(mysqli_fetch_array($result));
	echo("<br>");

	// we need to close the result to run more queries
	mysqli_free_result($result);

	// close connection
	mysqli_close($link);
    }

    // you can also use object oriented style
    function mysql_oop(){
	// no idea why you need to specify database
	// db should be called connection, you can switch dbs
	$db = new mysqli("localhost", "root", "root", "testing");
	if($db->connect_errno){
	    echo("Error connecting to the DB<br>");
	    exit();
	}

	// you can switch database
	//test1_switch_db($db, "mysql");

	// running a select
	//test2_run_query($db);

	// escaping special characters (e.g. from forms)
	//test3_escaping($db);

	// insert, update, delete
	test4_alter($db);

	// close connection
	$db->close();
    }

    function test4_alter($db){
	// inserting something in the db
	echo("Students table before insertion:<br>");
	show_table($db, "Students");
	test4_insert($db);

	// updating it
	test4_update($db);
	echo("Students table after insertion & update:<br>");
	show_table($db, "Students");

	// delete the entry
	test4_delete($db);
	echo("Students table after deletion:<br>");
	show_table($db, "Students");
    }

    function test4_delete($db){
	$query = "delete from Students where name = 'tim'";
	if ($result = $db->query($query)){
	    // nothing to close here??
	    //$result->close();
	} else {
	    echo("MySQL error: " . $db->error . "<br>");
	}
    }

    function test4_update($db){
	$query = "update Students set email= 'tim@mail.com' where " .
		 "name = 'tim' limit 1";
	if ($result = $db->query($query)){
	    // nothing to close?
	} else {
	    echo("MySQL error: " . $db->error . "<br>");
	}
    }

    function test4_insert($db){
	// also INSERT INTO `Students` (`id`, ...) ...
	$query = "insert into Students (id, name, email) values " .
		 "(10, 'tim', 'tim@edu.com')";
	if ($result = $db->query($query)){
	    // nothing to close??
	    //$result->close();
	} else {
	    echo("MySQL error: " . $db->error . "<br>");
	}
    }

    function test3_escaping($db){
	// if we want to run a query on the db from a form
	// we should sanitize the input first
	// TODO

	// this just escapes stuff like '/"?
	// works when inserting strings
	// also, why do we need a db object for this
	echo($db->real_escape_string("tim;<br><br>"));
    }

    function test2_run_query($db){

	echo("Running <b>SELECT Host, User FROM mysql.user</b>:" .
	     "<br><br>");

	// the ; at the end makes no difference
	$query = "select host, user from mysql.user";
	if ($result = $db->query($query)){
	    // $result is a mysqli_result obj
	    echo("<table>");
	    echo("<tr><th>Host</th><th>User</th></tr>");
	    $num_cols = $result->field_count;
	    for ($row = 0; $row < $result->num_rows; $row++){

		// this is not needed, it gets incremented automatically
		//$result->data_seek($row);

		// row_data has both [col_number] => val
		//   and [field_name] => val
		$row_data = $result->fetch_array();
		echo("<tr>");
		for ($col = 0; $col < $num_cols; $col++){
		    echo("<td>" . $row_data[$col] . "</td>");
		}
		echo("</tr>");
	    }
	    echo("</table><br>");

	    // to get all the rows at once, instead of fetch_array
	    // this method can be used $result->fetch_all()
	    // this requires MySQL Native Driver (mysqlnd)
	    $result->close();
	}
    }

    function test1_switch_db($db, $new_db){

	$query = "use mysql";
	if ($result = $db->query($query)){
	    echo("Switched database to mysql<br>");
	} else {
	    echo("Could not switc database to mysql<br>");
	    return;
	}

	$query = "select host, user from user";
	if ($result = $db->query($query)){
	    echo("First row: ");
	    print_r($result->fetch_array());
	    echo("<br>");
	}
    }

    // generic function to show all rows from a table
    // assumes table is in current db
    // also, function inside of a function, yay
    function show_table($db, $table_name){
	$query = "select * from " . $table_name;
	if ($result = $db->query($query)){
	    echo("<table>");

	    // show fields first
	    echo("<tr>");
	    $num_cols = $result->field_count;
	    for ($col = 0; $col < $num_cols; $col++){
		$field = $result->fetch_fields()[$col];
		echo("<th>" . $field->name . "</th>");
	    }
	    echo("</tr>");

	    // show rows
	    for ($row = 0; $row < $result->num_rows; $row++){
		$row_data = $result->fetch_array();
		echo("<tr>");
		for ($col = 0; $col < $num_cols; $col++){
		    echo("<td>" . $row_data[$col] . "</td>");
		}
		echo("</tr>");
	    }
	    echo("</table><br>");
	}
    }
    ?>
    <br><br>
</body>
