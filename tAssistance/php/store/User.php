<?php

namespace TAssistance\store;

use TAssistance;
use TAssistance\common;

class User{
		
	public static function &getUserById(&$users, $user_id){
			
		foreach($users as $key => &$user){
			if($user->id==$user_id){
				return $user;
			}
		}
	
		return false;
	}
	
	public static function &getFilter(&$users, $user_id, $velement_id){
		
		$user = &User::getUserById($users, $user_id);
		$timeline = &TAssistance\common\_Object::getValueById($user->configs, "timeline");
		$velement = &TAssistance\common\_Object::getValueById($timeline->velements, $velement_id);
		return $velement->filter;
	}
	
	public static function getPFilter($users, $user_id, $velement_id, $pfilter_id){
		$filter = User::getFilter($users, $user_id, $velement_id);
		$pfilters = $filter->pfilters;
	
		$pfilter = null;
			
		foreach($pfilters as $object) {
			if ($pfilter_id == $object->id) {
				$pfilter = $object;
				break;
			}
		}
	
		return $pfilter;
	}
	
	public static function &getPFilterInfo(&$users, $user_id, $velement_id, $pfilter_id){
		$info = new \stdClass();
		
		$filter = &User::getFilter($users, $user_id, $velement_id);
		
		$info->filter = &$filter;
		
		$pfilters = &$filter->pfilters;
		
		$info->pfilters = &$pfilters;
		
		$pfilter = null;
		$pfilter_key = false;
			
		foreach($pfilters as $key => &$object) {
			if ($pfilter_id == $object->id) {
				$pfilter = &$object;
				$pfilter_key = $key;
				break;
			}
		}
		
		$info->pfilter = &$pfilter;
		
		//$pfilter->test = "3";
		
		$info->key = $pfilter_key;
		
		return $info;
	}
	
}