<?php
class Http{

	public static function get($url)
	{
		
		
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_HTTPGET, true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($curl);
		
		curl_close($curl);
		
		return $response;
	}
	
	public static function delete($url){
		
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		$reponse = curl_exec($curl);
		$infos = curl_getinfo($curl);
		curl_close($curl);
		
		$http_code = $infos["http_code"];
		//Log::writeRestfulLog("put", $url, $content, $http_code);
		if($http_code == "200") return true; else return false;
	}
	
	public static function getHTTPs($url,$auth)
	{
		$header = array("AUTH_TOKEN: ".$auth);
		
		$curl = curl_init($url);		
		
		curl_setopt($curl, CURLOPT_HTTPGET, true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		$response = curl_exec($curl);
		
		$infos = curl_getinfo($curl);
		
		echo curl_errno($curl);
		
		curl_close($curl);
	
		return $response;
	}
		
}