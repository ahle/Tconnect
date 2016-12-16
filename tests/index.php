<?php
		echo "haha";
		try{
			//$tab = [1,2,3] % [2,1,0];			
			$tab = 100 % 11;
			$a;
			//if($tab===false){
				throw new ErrorException("Illegal operation");
				echo "hoho";
			//}
		}
		catch (Exception $e){
			echo $e->getMessage()."hehe";
			//echo "hihi";
 		}
// 		finally{
// 			//var_dump($tab);
// 			var_dump("a");
// 		}
		echo "hehe";