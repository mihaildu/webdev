<?php
/*
 * this has only php code (test using "php test1.php")
 */

// this should be defined before the code that uses them
define("MY_CONSTANT", "some value");

// global var
$my_global_var = 10;

main();

function main(){
    //test9_multiple_ret_vars2();
    //test8_multiple_ret_vars();
    //test7_escaping();
    //test6_constants();
    //test5_hashing();
    //test4_string_cmp();
    //test3_regex();
    test2_from_php();
    //test1();
}

function test9_multiple_ret_vars2(){
    $ret = _test9();
    print_r($ret["messages"]);
    echo($ret["messages"][0] . "\n");
}

function _test9(){
    return array("success" => true,
		 "messages" => array("message1", "message2"));
}

function test8_multiple_ret_vars(){
    $ret = _test8();
    $ret_bool = $ret["success"];
    $ret_msg = $ret["message"];
    echo($ret_bool . "\n");
    echo($ret_msg . "\n");
}

function _test8(){
    return array("success" => true, "message" => "error message<br>");
}

function test7_escaping(){
    $str = "some' \"string";
    echo("the string without escaping: " . $str . "\n");
    echo("the string with escaping: " . addslashes($str) . "\n");
}

function test6_constants(){
    echo(MY_CONSTANT . "\n");
}

function test5_hashing(){
    // this is 32 chars long
    echo("md5('test string') = " . md5("test string") . "\n");
    // this is 40 chars long
    echo("sha1('test string') = " . sha1("test string") . "\n");

    // this will print all available hashing algorithms
    //print_r(hash_algos());

    // generic function to use a hashing algorithm: hash(algo, string)
    // e.g. sha256
    // this is 64 chars long
    echo("sha256('test string') = " . hash("sha256", "test string") . "\n");

    /* mysql 4.1 hashing
     * PASSWORD("test") = 94BDCEBE19083CE2A1F959FD02F964C7AF4CFC29
     * this is basically SHA1(UNHEX(SHA1("test")))
     * this takes the sha1("test") and, instead of interpreting it
     * as a string, it interprets it in binary (or hex), and
     * it applies the sha1 again

     * e.g.
     * sha1("test") = a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
     * sha1(sha1("test")) would be
     * sha1("a94a8fe5ccb19ba61c4c0873d391e987982fbbd3")
     * instead we have
     * sha1(a94a8fe5ccb19ba61c4c0873d391e987982fbbd3)
     */

    /* there are websites with stored
     * hashes that could decode this
     * e.g. crackstation.net
     */

    /* more about hex()/unhex()
     *
     * HEX() function converts int -> hex
     * e.g. HEX(15) = F
     * for a char it takes the binary value (ascii/unicode)
     * e.g. HEX('a') = HEX(97) = 61
     * for a string it does the same for every char
     * e.g. HEX('abc') = 616263

     * UNHEX() is the inverse, e.g. it takes a number repres
     * in hex and it outputs the string
     * e.g. UNHEX(61) = 97 = 'a' (ascii/unicode)
     */

    // php function for unhex - hex2bin
    echo(sha1(hex2bin(sha1("test"))) . "\n");
}

function test4_string_cmp(){
    $s1 = "string 1";
    $s2 = "string 1";
    if ($s1 == $s2){
	echo("equal\n");
    } else {
	echo("not equal\n");
    }
}

function test3_regex(){
    preg_match("/cats (.*?) cute/i", "cats are cute", $matches);
    print_r($matches);
    echo($matches[1]);
}

function test2_from_php(){
    /*
     * This is the same code from php/test1.php but ref friendlier
     * */

    /* a is a variable
     * . is concat for strings
     * there are automatic conversions
     */
    $a = 10;
    echo("a = " . $a . "\n");

    /* doing the same */
    echo("a = $a\n");

    /* you don't need parentheses for echo */
    echo "hello from echo\n";

    /* you can also use print */
    print("hello from print\n");

    /* printing the type of $a */
    echo("type of a = ". gettype($a) . "\n");

    /*
     * some sort of gettype + value
     * this also prints boolean values (unlike echo/print_r)
     */
    echo("var_dump(a) = " . var_dump($a) . "\n");

    /* doing arithmetics */
    $b = 15;
    echo(($a + $b) . "\n");

    /* you can do some crazy shit with $ */
    $var1 = "the value of variable 1";
    $name_of_var1 = "var1";
    /* this will evaluate to $var1 */
    echo("$$" . "name_of_var1 = " . $$name_of_var1 . "\n");

    /*
     * arrays
     *
     * arrays are basically dictionaries in php, you have a key and a value
     * by default the keys are "0", "1", ...
     * the common notation you use is "key" => "value"
     * e.g. array("0" => 1, "1" => 10, ...)
     * */

    /* this is [0 => 3, 1 => 4] */
    $arr = array(3, 4);

    /* this is ["k1" => 10, "k2" => "string"] */
    $arr2 = array("k1" => 10, "k2" => "string");

    /* printing an array the old fashioned way - for loop */
    echo("arr = [");
    for($i = 0; $i < count($arr); $i++){
	echo($arr[$i] . " ");
    }
    echo("]\n");

    /*
     * I assume count() is not O(1)
     * you can also use sizeof()
     */

    /* other way to print the array */
    echo("arr = [");
    foreach($arr as $key => $value){
	echo("(" . $key . " => " . $value . ") ");
    }
    echo("]\n");

    /* you can also use the values only */
    echo("arr values = [");
    foreach($arr as $value){
	echo($value . " ");
    }
    echo("]\n");

    /* one last way to print the array */
    print_r($arr);

    /* adding a new value at the end of the array */
    $arr[] = 100;
    print_r($arr);

    /* removing an element by key */
    unset($arr[1]);
    print_r($arr);

    /* you can unset variables too */
    $my_var = 10;
    unset($my_var);
    // this will generate an error (too much of a hassle to catch this error)
    // echo($my_var . "\n");

    /* while loop */
    $i = 0;
    while($i < 10){
	$i = $i + 1;
    }
    echo("i = " . $i . "\n");

    /* sorting an array (after values)
     * this will not keep key => value pairs
     * e.g. before sort we have 0 => 7, after 0 => 1
     * this also happens if we have other types as keys,
     * like strings, they will be changed to 0, 1, ...
     * */
    $arr3 = array(7, 5, 6, 3, 2, 1, 9, 10);
    sort($arr3);
    print_r($arr3);

    /* to keep key - value pairs use asort */
    $arr4 = array(7, 5, 6, 3, 2, 1, 9, 10);
    asort($arr4);
    print_r($arr4);

    /* sorting after keys */
    $arr5 = array("c" => 2, "a" => 3, "b" => 1);
    ksort($arr5);
    print_r($arr5);

    /* you can also shuffle the array
     * apparently you also lose the keys with this
     * */
    shuffle($arr5);
    print_r($arr5);

    /* check if variable is array */
    if (is_array($arr4))
	echo("arr4 is an array\n");
    if (!is_array($a))
	echo("a is not an array\n");

    /* checking if we have a key - generic isset */
    if (isset($arr4["a"]))
	echo("we have a hit at key a\n");

    /* if statement example */
    $my_bool1 = true;
    if ($my_bool1){
	echo("my_bool1 is true\n");
    } else {
	echo("my_bool1 is false\n");
    }

    $my_bool2 = false;
    if ($my_bool1 and !$my_bool2)
	echo("matched\n");

    /* explicit casts */
    echo("10 + 12 = " . (int)"10" + 12 . "\n");
    echo("string(17) = " . (string)17 . "\n");

    /* more on automatic type conversions
     * this prints 27
     */
    echo("15" + 12 . "\n");

    /* you don't need to add \n, you print strings like this
     * I will prob never use this though
     * */
    echo(
	"first line
second line\n");

    /* this is true */
    if (123 == "123")
	echo("123 = \"123\"\n");

    /* this is also true */
    if (false == "0")
	echo("false = 0\n");

    /* however this is false
     * === is the identity operator
     * it won't do automatic conversions
     * */
    if (false === "0")
	echo("false === 0\n");

    /* example where the identity operator might be useful
     * strpos() returns the position of the substr in a str
     * or false (0) otherwise which might be mistaken with
     * position 0
     * */
    $pos = strpos("this is a string", "this");
    if (!$pos)
	echo("substring not found\n");
    if ($pos === false)
	echo("substring not found\n");
    else
	echo("substring found on position " . $pos . "\n");

    /* this is obv true */
    if ((5 < 6) == "2" - "1")
	echo("(5 < 6) = \"2\" - \"1\"\n");

    /* when converted to int, strings will be 0
     * (int)"str" is NOT converted to false
     * */
    $res = "some string" + 15;
    echo("\"some string\" + 15 = " . $res . "\n");
    if ((int)"other string" == 0)
	echo("it is converted to 0\n");

    /* true autoconverts to 1 (strings)
     * while false converts to empty string
     * */
    echo("A" . false . "B\n");
    echo("A" . true . "B\n");

    /* splitting a string after spaces */
    $my_str = "this is a string";
    $words = explode(" ", $my_str);
    print_r($words);

    /* putting them back in */
    $original_str = implode(" ", $words);
    echo($original_str . "\n");

    /* more built-in functions - strings */
    echo(strrev("This will reverse the string") . "\n");
    echo(str_repeat("Blah", 2) . "\n");
    echo(strtoupper("blah") . "\n");

    /* normally function arguments are call by value
     * we can can call by ref too
     * */
    $a = 10;
    test2_ref($a);
    echo("a = " . $a . "\n");

    /* using global variables */
    global $my_global_var;
    echo("my_global_var = " . $my_global_var . "\n");

    /* we can check for function existance */
    if (function_exists("array_combine")){
	echo("array_combine exists\n");
    } else {
	echo("array_combine doesn't exist\n");
    }

    /* in PHP you have both functional and OOP stuff */

    /* date - functional */
    echo("The date is " . date("Y-m-d") . "\n");
    $next_week = time() + (7 * 24 * 60 * 60);
    echo("The date next week is " . date("Y-m-d", $next_week) . "\n");

    /* date - oop */
    $now = new DateTime();
    echo("The date is " . $now->format("Y-m-d") . "\n");
    $next_week = new DateTime("today +1 week");
    echo("The date next week is " . $next_week->format("Y-m-d") . "\n");

    /* class/objects */
    class Person {
	private $first_name;
	private $last_name;
	private $age;
	protected $hobby;

	public function __construct($first_name = "", $last_name = "",
				    $age = -1) {
	    //echo("this is the constructor\n");
	    $this->first_name = $first_name;
	    $this->last_name = $last_name;
	    $this->age = $age;
	}

	public function __destruct() {
	    //echo("this is the destructor\n");
	}

	public function set_age($age) {
	    // check age first
	    $this->age = $age;
	}

	public function get_age() {
	    return $this->age;
	}

	public static function static_function() {
	    echo("This is a static function\n");
	}

	public function set_hobby($hobby) {
	    $this->hobby = $hobby;
	}
    }

    $tim = new Person("tim", "timothy", 10);
    echo $tim->get_age() . "\n";
    $tim->set_age(20);
    echo $tim->get_age() . "\n";

    /* calling a static function */
    Person::static_function();

    /* inheritance */
    class Employee extends Person {
	public function get_hobby() {
	    return $this->hobby;
	}
    }

    $tom = new Employee("tom", "tommy", 12);
    $tom->set_hobby("smoking");
    echo $tom->get_hobby() . "\n";

    /* stdClass - on the fly object? */
    $obj = new stdClass();
    $obj->name = "Some name";
    $obj->some_func = function () { echo("hello form std func\n"); };

    echo($obj->name . "\n");
    // TODO maybe look into this
    //$obj->some_func();

    /*
     * TODO this should be moved somewhere else
     * difference between require and include:
     * if the file is not found:
     *   require - will generate an error
     *   include - only a warning
     */

    /* try - catch */
    try {
	$divisor = 0;
	if ($divisor == 0)
	    throw new Exception("Division by zero");
	else
	    $val = 10 / 0;
    } catch (Exception $ex) {
	echo("Exception message: " . $ex->getMessage() . "\n");
	/*
	 * we can also log this to a file
	 * error_log needs to be set in ini for this to work
	 * ini_set("error_log", "/some/file");
	 */
	error_log("Exception message: " . $ex->getMessage() . "\n");
    }

    /* you can have json in php (e.g. from js) */
    $arr = array("first" => "first value", "second" => "second value");
    /* JSON_PRETTY_PRINT is optional */
    echo(json_encode($arr, JSON_PRETTY_PRINT));
}

function test2_ref(&$var){
    $var = $var + 10;
}

function test1(){
    echo("hello\n");
}
?>
