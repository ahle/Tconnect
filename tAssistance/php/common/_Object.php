<?php
namespace TAssistance\common;

class _Object {
	
	public static function getKey(&$objects, &$search_object){
		//echo "data=".$data;
		foreach($objects as $key => $value){
			$object = $objects[$key];
				
			if($object===$search_object){
				return $key;
			}
		}
		return false;
	}
	
	public static function getKeyById(&$objects, $search_id){
		//echo "data=".$data;
		foreach($objects as $key => $value){
			$object = $objects[$key];
	
			if($object->id===$search_id){
				return $key;
			}
		}
		return false;
	}
	
	public static function &getValueById(&$objects, $search_id){
		//echo "data=".$data;
		foreach($objects as $key => &$object){
	
			if($object->id===$search_id){
				return $object;
			}
		}
		return false;
	}
}