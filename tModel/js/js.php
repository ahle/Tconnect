<?php

error_reporting(0);

//require 'jsmin.php';

header("Content-type: text/javascript");

$debug = true;

$files = array("Trace.js"
				);

$js = "";
foreach($files as $f)
  $js .= file_get_contents($f);
  
if ($html) {
  foreach($filesHtml as $f)
  $js .= file_get_contents($f);
}

if($debug) {
  echo $js;
} else {
  echo $jsmin_php = JSMin::minify($js);
}