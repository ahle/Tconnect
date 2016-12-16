<?php

error_reporting(0);

header('Content-Type: image/png');

$tconnect_dir = dirname(dirname(dirname(__FILE__)));
$tassist_php_dir = dirname(dirname(__FILE__));
$tassist_ext_dir = $tassist_php_dir."/extensions/";
$oza_assist_dir = $tassist_php_dir."/extensions/ozalid";

$debug = true;

$files = array( 
		"oze_idg" => "$oza_assist_dir/img/obsels/oze_idg.png",
		"oze_view" => "$oza_assist_dir/img/obsels/oze_view.png",
		"ozec_w" => "$oza_assist_dir/img/obsels/ozec_w.png",
		"button" => "/var/www/tconnect/tAssistance/img/ozavocal/vocal.jpg",
		"nav" => "/var/www/tconnect/tAssistance/img/ozavocal/nav.png",
		"index" => "/var/www/tconnect/tAssistance/img/ozavocal/index.png",
		"load" => "/var/www/tconnect/tAssistance/img/ozavocal/load.png",
		"input" => "/var/www/tconnect/tAssistance/img/ozavocal/input.png",
		"search" => "/var/www/tconnect/tAssistance/img/ozavocal/search.png",
		"go" => "/var/www/tconnect/tAssistance/img/ozavocal/go.png",
		"escape" => "/var/www/tconnect/tAssistance/img/ozavocal/escape.png",
				);
  
if($_SERVER[REQUEST_METHOD]=="GET"){

	$file_id = ltrim($_SERVER['PATH_INFO'],'/');

	//echo "$oza_assist_dir/img/obsels/oze_idg.png";
	
	$image = "";
	foreach($files as $id => $filename){
		
		if($id==$file_id){
			
			$file = file_get_contents($filename);
			
			echo $file;
			
			exit;
		}
	}
}