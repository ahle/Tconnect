<?php
class OzaToken{
	
	public function encryptAES($input, $key)
	{
	
		$size = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
		//$size = mcrypt_get_block_size('tripledes');
					
		$input = OzaToken::pkcs5_pad($input, $size);
		$td = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_ECB, '');
		$iv = mcrypt_create_iv (mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
		mcrypt_generic_init($td, $key, $iv);
		$data = mcrypt_generic($td, $input);
		mcrypt_generic_deinit($td);
		mcrypt_module_close($td);
		$data = base64_encode($data);
		return $data;
	}
	
	function pkcs5_pad ($text, $blocksize)
	{
		$pad = $blocksize - (strlen($text) % $blocksize);
		return $text . str_repeat(chr($pad), $pad);
	}
	
	function decryptAES($sStr, $sKey)
	{
		$decrypted= mcrypt_decrypt(
				MCRYPT_RIJNDAEL_128,
				$sKey,
				base64_decode($sStr),
				MCRYPT_MODE_ECB
		);
		$dec_s = strlen($decrypted);
		$padding = ord($decrypted[$dec_s-1]);
		$decrypted = substr($decrypted, 0, -$padding);
		return $decrypted;
	}
	
	public static function getKey(){
		$key = 'oqHbbvuoyWxwSK9A34hZWvmJJFV-f8gc';
		return $key;
	}

	function parseToken($tokenEncrypt){
		$key = OzaToken::getKey();
		
		// $tokenEncrypt = "xHbIP2lo8blUwTKefA7f1Li1dmzOUx8SAnqNZCQXCVOoHFBuEYDIL0+/TwlpRx8d";
		// $tokenDecrypt = "1|1369730408199|ROLE_HOME;ROLE_DOCUMENT;";
		
		$tokenDecrypt = OzaToken::decryptAES($tokenEncrypt, $key);
		$parts = explode("|", $tokenDecrypt);
		$idUser = $parts[0];
		$milliseconds = $parts[1];
		$roles = explode(";", $parts[2]);
		
		$token = new stdClass();
		$token->idUser = $idUser;
		$token->milliseconds = $milliseconds;
		$token->roles = $roles;
		
		return $token;
	}
	
	public function encodeToken($token){
		$key = OzaToken::getKey();
		
		$idUser = $token->idUser;
		$milliseconds = $token->milliseconds;
		$roles = $token->roles;
		
		$token = "{$idUser}|{$milliseconds}|ROLE_HOME;ROLE_DOCUMENT;"; // $token = "1|1369730408199|ROLE_HOME;ROLE_DOCUMENT;";
		
		$tokenEncrypt = $this->encryptAES($token, $key);
		return $tokenEncrypt;
	}
	
	function test(){
	
		// Clé privé
		
		
		$idUser = 1;
		$milliseconds = 1369730408199; // G��n��r�� avec le code : round(microtime(true) * 1000);
		
		$token = "{$idUser}|{$milliseconds}|ROLE_HOME;ROLE_DOCUMENT;"; // $token = "1|1369730408199|ROLE_HOME;ROLE_DOCUMENT;";
		
		$tokenEncrypt = encryptAES($token, $key); 
		
		$tokenDecrypt = decryptAES($tokenEncrypt, $key); // $tokenEncrypt = "1|1369730408199|ROLE_HOME;ROLE_DOCUMENT;";
		
		print "Token : ".$token;
		print "\r\n<hr>\r\n";
		print "TokenEncrypt : ".$tokenEncrypt;
		print "\r\n<hr>\r\n";
		print "TokenDecrypt : ".$tokenDecrypt;
		print "\r\n<hr>\r\n";
		print "URL : https://ozalid.orange-labs.fr/ozviewer/editor/?idUser=$idUser&pseudo= (Pseudo) &idDocument= (idDocumentOrange) &token=".urlencode($tokenEncrypt);
			
	}	
}