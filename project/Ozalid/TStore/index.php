<?php
error_reporting(0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$ozalid_tstore = dirname(__FILE__);
$ozalid_dir = dirname(dirname(__FILE__));
$tconnect_dir = dirname(dirname($ozalid_dir));
$tStore_dir = $tconnect_dir."/tStore";
$ozalid_tstore_php = $ozalid_tstore."/php";

require_once $tStore_dir."/index.php";