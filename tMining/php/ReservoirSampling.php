<?php
echo "hoang";

class ReservoirSampling {


	// the best way for this, is the value is replaced by the items

	function reservoir ($list, $k){
		$result = array();
		$n = 0;
		for ($i = 0; $i<count($list); $i++){
			$item = $list[$i];
			$n +=1;
			if (count($result) < $k){
				$result[] = $item;
			}
			else{
				$s = rand(0, $n - 1);
		
				if ($s < $k){
					$result[$s] = $item;
				}
			}
		}
		return $result;
	}
}