<?php

class OzaWordFreMaker{
	function __construct(){
		$wordFreqs = array();
		
		
		//echo "bb";
		
		$store = new OzaTStore();
		$trace = $store->getCompleteTraceById("t_all");
		
		$obsels = $trace->obsels;
		
		foreach($obsels as $obsel){
			if($obsel->type=="ozec_w"){
				$idDoc = $obsel->idDoc;
				$idPage = $obsel->idPage;
				$rfW = $obsel->info_rfW;
				
				$idWord = $idDoc."_".$idPage."_".$rfW;
				$textWord = "";
				if($obsel->info_after){
					$textWord = $obsel->info_after;
				}
				else{
					$textWord = $obsel->info_text;
				}
				
				$a = new stdClass();
				$a->idDoc = $idDoc;
				$a->idPage = $idPage;
				$a->rfW = $rfW;
				$a->idWord = $idWord;
				$a->occurenceNb = 1;
				$a->textWord = $textWord;
				
				$wordFre = false;
				foreach($wordFreqs as $wordFreq){
					//echo $idWord;
					//echo $wordFreq->idWord;
					if($idWord == $wordFreq->idWord){
						//echo "h";
						$wordFre = $wordFreq;
						break;
					}
				}
				if($wordFre){
					$wordFre->occurenceNb = $wordFre->occurenceNb+1;
					$wordFre->textWord = $a->textWord; // lastest but need to implement more
				}
				else{
					$wordFreqs[] = $a;
				}
				
			}
		}
		// echo a chart bar here
		echo json_encode($wordFreqs);
		
		
		
		
		
	}
	
}

