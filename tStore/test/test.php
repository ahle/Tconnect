<?php
try{
SQLite3::version();
}
catch(Exception $e ){
	
	echo $e;
}
echo "<br>";
echo phpversion();

	echo $_SERVER["PATH_INFO"];

	



?>