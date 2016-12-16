<?php

class OzaQuery{
	
	function getWordsByDocId($trace_id,$doc_id){
		
		$wordFreqs = array();
		
		$store = new OzaTStore();
		$obsels = $store->getObsels($trace_id);

		
		foreach($obsels as $obsel){
			if($obsel->type=="ozec_w" && $obsel->idDoc == $doc_id){
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
		
		return $wordFreqs;
		
	}
	
	function getWords(){
	
		$wordFreqs = array();
	
		$store = new OzaTStore();
		$obsels = $store->getObsels("t_all");
	
	
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
	
		return $obsels;
	
	}
	
	function getWordsByDocIds($trace_id, $doc_ids){

		$wordFreqs = array();
		
		$store = new OzaTStore();
		$obsels = $store->getObsels($trace_id);
		
		
		foreach($obsels as $obsel){
			$idDoc = $obsel->idDoc;
			$index = array_search($idDoc, $doc_ids);
									
			if($obsel->type=="ozec_w" && $index!==false){				
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
		
		return $wordFreqs;
	}
	
	function getObselsByDocWordIds($trace_id, $doc_ids, $word_ids){
		
		$obsels = array();
		
		$store = new OzaTStore();
		$in_obsels = $store->getObsels($trace_id);
		
		
		foreach($in_obsels as $in_obsel){
			$idDoc = $in_obsel->idDoc;
			$indDoc = array_search($idDoc, $doc_ids);			
				
			if($in_obsel->type=="ozec_w" && $indDoc!==false){
				
				$idPage = $in_obsel->idPage;
				$rfW = $in_obsel->info_rfW;
				$idWord = $idDoc."_".$idPage."_".$rfW;				
				$textWord = "";
				if($in_obsel->info_after){
					$textWord = $in_obsel->info_after;
				}
				else{
					$textWord = $in_obsel->info_text;
				}
				
				$indWord =  array_search($idWord, $word_ids);
		
				if($indWord===false) continue;
				
				$obsel = $in_obsel;
				$obsel->idWord = $idWord;
				$obsel->textWord = $textWord;
				
				$obsels[] = $obsel;
		
			}
		}
		
		return $obsels;
	}


}