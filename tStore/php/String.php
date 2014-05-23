<?php

class String{
	
	static function startsWith($haystack, $needle)
	{
		return !strncmp($haystack, $needle, strlen($needle));
	}
	
	static function endsWith($haystack, $needle)
	{
		$length = strlen($needle);
		if ($length == 0) {
			return true;
		}
	
		return (substr($haystack, -$length) === $needle);
	}
}