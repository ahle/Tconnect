<?php

$dir = dirname(__FILE__);
require_once $dir."/OzaDBClient.php";

$db = new OzaDBClient();
$summary = $db->getDoc("546ef1c8e4b091320026c063");
echo json_encode($summary);

//echo "hehe";


