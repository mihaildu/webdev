<?php
/*
 * this has only php code (test using "php test1.php")
 */

main();

function main(){
    test3_regex();
    //test2();
    //test1();
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
