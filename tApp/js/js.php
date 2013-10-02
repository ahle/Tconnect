<?php
$dir= dirname(dirname(__FILE__));
require_once $dir.'/js/jsmin.php';
require_once $dir.'/include/global.php';

header("Content-type: text/javascript");

$debug = true;

$files = array(
"../js/jquery.js"	
,"../js/tApp.js"
);

$js = "";
foreach($files as $f){
  $content = file_get_contents($f);
  if($f=="../js/tApp.js"){
  	$content = str_replace("\$app_id", $app_id, $content);
  	$content = str_replace("\$assistance_url", $assistance_url, $content);
  }
  $js .= $content;
}
if ($html) {
  foreach($filesHtml as $f)
  $js .= file_get_contents($f);
}

if($debug) {
  echo $js;
} else {
  echo $jsmin_php = JSMin::minify($js);
}