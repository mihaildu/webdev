<?php
/*
 * This is an alternative to .htaccess to forbid access to files in
 * include/ dir. This files needs to be included in all component
 * files. The main files must define GUARD_PHP.
 * */
if (!defined("GUARD_PHP")){
    echo("You are not authorized to view this page");
    return;
}
?>
