<?php

//session_start();
session_destroy();
$return = $_GET["return"];

header('Location: index.php?page=login&return='.urlencode($return));