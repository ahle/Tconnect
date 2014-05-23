<?php 

$dir=dirname(__FILE__);
require_once $dir.'/../SocialNetwork/OzaToken.php';

function testToken(){
	$idUser = 1;
	$milliseconds = 1369730408199;
	//$tokenEncrypt = "xHbIP2lo8blUwTKefA7f1Li1dmzOUx8SAnqNZCQXCVOoHFBuEYDIL0+/TwlpRx8d";
	//$tokenEncrypt = "vaxtW68N9TzEoVUeziBfmRDsi74oVD8JpOG4uSn9G74iyP9MAa8fptlbt1RwYTUqwohJ7e9ij3hW5uYs1enDYg==";
	$tokenEncrypt = "T33JZIfVQVvOckG72pb54+Xi/RVerupemKUe/342ZNzJpQZfW8UPZI+J5J0SA1pCdcmF+oN3hJof/f4xxsh0gg==";
	
	$token = new stdClass();
	$token->idUser = "1";
	$token->milliseconds = 1369730408199;
	
	//$ozaToken = new OzaToken();
	//$tokenEncrypt1 = $ozaToken->encodeToken($token);
	
	//echo "Test encodeToken: ".($tokenEncrypt==$tokenEncrypt1)."\n";
	
	$ozaToken = new OzaToken();
	$token1 = $ozaToken->parseToken($tokenEncrypt);
		
	//echo "Test parseToken: ".($token1->idUser=="1");
	//echo $token1->idUser;
	echo json_encode($token1);
}

testToken();


























