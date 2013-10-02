<?php 
session_start();

# variables
$tApp_dir = dirname(dirname(__FILE__));
$app_config = $tApp_dir."/config/app.conf";


# functions
function get_app_id(){
	global $app_config;

	try{
		$filename = $app_config;
	
		$ini_array=parse_ini_file($filename);
		return $ini_array["app_id"];
	}
	catch(Exception $e){
		$e;
	}
	return false;
}

function write_ini_file($assoc_arr, $path, $has_sections=FALSE) {
	$content = "";
	if ($has_sections) {
		foreach ($assoc_arr as $key=>$elem) {
			$content .= "[".$key."]\n";
			foreach ($elem as $key2=>$elem2) {
				if(is_array($elem2))
				{
					for($i=0;$i<count($elem2);$i++)
					{
						$content .= $key2."[] = \"".$elem2[$i]."\"\n";
					}
				}
				else if($elem2=="") $content .= $key2." = \n";
				else $content .= $key2." = \"".$elem2."\"\n";
			}
		}
	}
	else {
		foreach ($assoc_arr as $key=>$elem) {
			if(is_array($elem))
			{
				for($i=0;$i<count($elem);$i++)
				{
					$content .= $key."[] = \"".$elem[$i]."\"\n";
				}
			}
			else if($elem=="") $content .= $key." = \n";
			else $content .= $key." = \"".$elem."\"\n";
		}
	}

	if (!$handle = fopen($path, 'w')) {
		return false;
	}
	if (!fwrite($handle, $content)) {
		fclose($handle);
		return false;
	}
	fclose($handle);
	return true;
}

function get_assistance_url(){
	global $app_config;
	
	try{
		$filename = $app_config;
	
		$ini_array=parse_ini_file($filename);
		return $ini_array["assistance_url"];
	}
	catch(Exception $e){
		$e;
	}
	return false;
}
# calculated variables
$app_id = get_app_id();
$assistance_url = get_assistance_url();