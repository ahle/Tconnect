<?php

class BasicCounter{
	
	function __construct($trace){
		$this->trace = $trace;
	}
	
	function receiveObsel($new_obsel){
		require_once "/var/www/tconnect/project/Ozalid/TStore/php/OzaTStore.php";
		
		$trace = $this->trace;
		
		$old_counter = -1;
		$counter = 0;
		if(isset($trace->stats->count)){
			$old_counter = $trace->stats->count;
			$counter = $old_counter;
		}
		
		$counter++;
		
		$trace->stats->count = $counter;
		// save the result to the tstore
		if($counter!=$old_counter){
			$store = new OzaTStore();
			$store->updateTrace($trace);
		}
	}
	
}


