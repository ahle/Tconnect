<?php

class OzaVWCounter{
	
	function __construct($trace){
		$this->trace = $trace;
	}
	
	function receiveObsel($new_obsel){
		require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaTStore.php";
		
		$trace = $this->trace;
		
		$old_counter = -1;
		$counter = 0;
		if(isset($trace->stats->validCnt)){
			$old_counter = $trace->stats->validCnt;
			$counter = $old_counter;
		}
		
		if($new_obsel->type=="ozev_w"){
			$counter++;
		}
		
		$trace->stats->validCnt = $counter;
		// save the result to the tstore
		if($counter!=$old_counter){
			$store = new OzaTStore();
			$store->updateTrace($trace);
		}
	}
	
}


