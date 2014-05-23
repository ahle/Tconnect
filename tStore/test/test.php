<?php
$tStore_dir = dirname(dirname(__FILE__));

require_once $tStore_dir.'/php/Store.php';

//echo "<br>";
//echo phpinfo();
//echo SQLite3::version();

//echo $_SERVER["PATH_INFO"];

$store = new Store();
$nodes = $store->getNodes();
var_dump($nodes);

?>