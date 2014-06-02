<?php

header("Content-type: text/css");

$debug = true;

$files = array(	"OzaTextObsel.css",
				"OzaTraceList.css",
				"OzaObselSearch.css"
				);

$css = "";
foreach($files as $f)
  $css .= file_get_contents($f);

if($debug) {
	echo $css;
} else {
	
}