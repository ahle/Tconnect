<?php
namespace TAssistance\common;

class URI {
	
	public static function getCurrentUrl($strip = true){
		// filter function
// 	    $filter = function($input, $strip) {
// 	        $input = urldecode($input);
// 	        $input = str_ireplace(array("\0", '%00', "\x0a", '%0a', "\x1a", '%1a'), '', $input);
// 	        if ($strip) {
// 	            $input = strip_tags($input);
// 	        }
// 	        $input = htmlentities($input, ENT_QUOTES, 'UTF-8'); // or whatever encoding you use...
// 	        return trim($input);
// 	    };
	
	    $url = array();
	    // set protocol
	    $url['protocol'] = 'http://';
	    if (isset($_SERVER['HTTPS']) && (strtolower($_SERVER['HTTPS']) === 'on' || $_SERVER['HTTPS'] == 1)) {
	        $url['protocol'] = 'https://';
	    } elseif (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) {
	        $url['protocol'] = 'https://';
	    }
	    // set host
	    $url['host'] = $_SERVER['HTTP_HOST'];
	    // set request uri in a secure way
	    $url['request_uri'] = $_SERVER['REQUEST_URI'];
	    return join('', $url);
	}
}