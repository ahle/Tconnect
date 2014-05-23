<?php 

$fn_attributes = function($attributes){
	$ret = new stdClass();
	
	$p="hasBegin";
	$value=;
	
	
	$ret->{$p} = $value;
	
	$this->hasBegin = $obsel->begin;
	$this->hasEnd = $obsel->end;
	
	$this->subject = $obsel->user;
	$this->name = $obsel->type.$obsel->begin;
	$this->type = $obsel->type;
	$this->user = $obsel->user;
	$this->idSession = $obsel->idSession;
	$this->idDoc = $obsel->idDoc;
	$this->idPage = $obsel->idPage;
	
	foreach ($obsel as $p => $value){
		if(!strncmp($p,"info_",strlen("info_"))){
			$this->{$p} = $value;
		}
	}
	
	
	
};









