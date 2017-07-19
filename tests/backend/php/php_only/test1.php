<?php
/*
 * this has only php code (test using "php test1.php")
 */

// this should be defined before the code that uses them
define("MY_CONSTANT", "some value");

main();

function main(){
    test7_escaping();
    //test6_constants();
    //test5_hashing();
    //test4_string_cmp();
    //test3_regex();
    //test2();
    //test1();
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

function test2(){
    $a = 10;
    $b = 15;
    echo(($a + $b) . "\n");
}

function test1(){
    echo("hello\n");
}
?>
