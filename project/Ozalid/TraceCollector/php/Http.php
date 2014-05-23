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
		
}