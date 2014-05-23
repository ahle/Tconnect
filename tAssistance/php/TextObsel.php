<?php

require_once "/var/www/tconnect/project/Ozalid/CorrectionServer/OzaEditorClient.php";

class TextObsel{
	
	public $str_obsel_attr = array(
			"id"=>"ID obsel",
			"type"=>"Type",
			"idPage"=>"ID Page",
			"idDoc" =>"ID Document",
			"info_before" =>"Before",
			"info_after" =>"After",
			"user" =>"User",
			"idSession" =>"ID Session",
			"info_titleDoc" =>"Document Title",
			"info_userAgent" =>"User Agent",
			"begin" => "Begin",
			"end" => "End",
			"info_author" =>"Author",
			"info_idDoc" =>"Info ID Document",
			"info_text" =>"Info Text",
	);
	
	public $str_obsel_type = array(
			"oze_idg"=>"opened a dialog",
			"ozec_w"=>"correct a word",
			"oze_view"=>" opened a view",
			"idDoc" =>"ID Document",
			"info_before" =>"Before",
			"info_after" =>"After",
			"user" =>"User",
			"idSession" =>"ID Session",
			"begin" => "Begin",
			"end" => "End",
			"ozev_w" => "validate a word",
			"oze_subview" => "open a subview",
			"ozem_fn" => "do a function"
	);
	
	public $obsel_attr = array(
			"type"=> "type",
	);
	
	function parse_obsel_attr($attr){
		$str_obsel_attr = $this->str_obsel_attr;
		if($str_obsel_attr[$attr]){
			return $str_obsel_attr[$attr];
		}
		return $attr;
	}
	
	function parse_obsel_value($attr,$value){
		$obsel_attr = $this->obsel_attr;
		$str_obsel_type = $this->str_obsel_type;
	
		if($attr==$obsel_attr["type"]){
			if($str_obsel_type[$value]!==null){
				$value = $str_obsel_type[$value];
			}
		}
		else
		{
			$value = mb_convert_encoding($value, 'HTML-ENTITIES', 'UTF-8');
		}
		return $value;
	}
	
	function __construct($obsel){
		$this->obsel = $obsel;
	}
	
	function toHtml(){
		$str_obsel_attr = $this->str_obsel_attr;
		
		$obsel = $this->obsel;
		
		$html = file_get_contents("/var/www/tconnect/tAssistance/html/TextObsel.html");
		$idObsel = "";
		$begin = "";
		$end = "";
		$type = "";
		$action = "";
		$idDoc = "";
		$idPage = "";
		$before = "";
		$after = "";
		$user = "";
		$titleDoc = "";
		$userAgent = "";
		$tv = "";
		$v = "";
		$request = "";
		$pageSelected = "";
		$author = "";
		$pageNb = "";
		$numPage = "";
		$rfW = "";
		$nbdocs = "";
		$idview = "";
		$button = "";
		$goidview = "";
		$info_idpage = "";
		$info_idDoc = "";
		$idsubview = "";
		$label = "";
		$info_text = "";
		$status = "";
		$correctionCount = "";
		
		foreach($obsel as $p => $o){
			if($p=="begin"){
				$p = $str_obsel_attr[$p];
				$o1 = $o;
				$date=date_create();
				date_timestamp_set($date,$o/1000);
				$milliseconds = fmod($o,1000);
				$o = date_format($date,'g:i:s.'.str_pad($milliseconds, 3, "0", STR_PAD_LEFT).' a \o\n l jS F Y');
				$begin = $o;
			}
			elseif($p=="end"){
				$p = $str_obsel_attr[$p];
				$o1 = $o;
				$date=date_create();
				date_timestamp_set($date,$o/1000);
				$milliseconds = fmod($o,1000);
				$o = date_format($date,'g:i:s.'.str_pad($milliseconds, 3, "0", STR_PAD_LEFT).' a \o\n l jS F Y');
				$end = $o;
			}
			elseif($p=="id"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idObsel=$o;
			}
			elseif($p=="subject"){
			}
			elseif($p=="type"){
				$p1 = $this->parse_obsel_attr($p);
				$type=$o;
				$o = $this->parse_obsel_value($p,$o);
				$action = $o;
			}
			elseif($p=="idSession"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idSession = $o;
			}
			elseif($p=="idDoc"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idDoc = $o;
			}
			elseif($p=="idPage"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idPage = $o;
			}
			elseif($p=="info_before"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$before =$o;
			}
			elseif($p=="info_after"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$after =$o;
			}
			elseif($p=="user"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$user = $o;
			}
			elseif($p=="info_titleDoc"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$titleDoc = $o;
			}
			elseif($p=="info_userAgent"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$userAgent = $o;
			}
			elseif($p=="info_tv"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$tv = $o;
			}
			elseif($p=="info_v"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$v = $o;
			}
			elseif($p=="info_request"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$request = $o;
			}
			elseif($p=="info_pageSelected"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$pageSelected = $o;
			}
			elseif($p=="info_author"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$author = $o;
			}
			elseif($p=="m:info_pageNb"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$pageNb = $o;
			}
			elseif($p=="info_numPage"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$numPage = $o;
			}
			elseif($p=="info_rfW"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$rfW = $o;
			}
			elseif($p=="info_nbdocs"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$nbdocs = $o;
			}
			elseif($p=="info_idview"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idview = $o;
			}
			elseif($p=="info_idsubview"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idsubview = $o;
			}
			elseif($p=="info_button"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$button = $o;
			}
			elseif($p=="info_goidview"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$goidview = $o;
			}
			elseif($p=="info_idPage"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$info_idpage = $o;
			}
			elseif($p=="info_idDoc"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$info_idDoc = $o;
			}
			elseif($p=="info_label"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$label = $o;
			}
			elseif($p=="info_text"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$info_text = $o;
			}
			elseif($p=="info_status"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$status = $o;
			}
			elseif($p=="info_correctionCount"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$correctionCount = $o;
			}
			else{
				if(true){
					$o = $this->parse_obsel_value($p,$o);
				}
			}
		}
		
		$editor = new OzaEditorClient();
		$docUri = $editor->getDocUri($idDoc);
		$pageUri = $editor->getPageUri($idDoc,$idPage);
		$info_pageUri = $editor->getPageUri($idDoc,$info_idpage);
		$info_idDocUri = $editor->getDocUri($info_idDoc);
		
		$text = "error: no matched type";
		$details = "";
		
		if($type=="oze_idg"){
			$text = "At $begin, the user (id=$user) <span style='color:green'>$action </span>";
			
			if($request=="deconnection"){
				$details = "<span class='textobsel-attr'>Request</span>: $request <br/>";
			}
			else{	
				
				$details = "<span class='textobsel-attr'>User Agent</span>: $userAgent <br/>";
				$details.= "<span class='textobsel-attr'>TV</span>: $tv <br/>";
				$details.= "<span class='textobsel-attr'>View</span>: $v <br/>";
			}
		}
		elseif($type=="oze_view"){
			$text = "At $begin, the user (id=$user) <span style='color:#CCCC00'>$action</span>";
			$details = "<span class='textobsel-attr'>Request</span>: $request <br/>";
			if($request=="vue page"){
				$details.= "<span class='textobsel-attr'>Selected page</span>: $pageSelected <br/>";
				$details.= "<span class='textobsel-attr'>TV</span>: $tv <br/>";
			}
			elseif($request=="ws/sec/doc"){
				$details.= "<span class='textobsel-attr'>Document Title</span>: $titleDoc <br/>";
				$details.= "<span class='textobsel-attr'>Author</span>: $author <br/>";
				$details.= "<span class='textobsel-attr'>Number of pages</span>: $pageNb <br/>";
			}
			elseif($request=="ws/sec/docs"){
				$details.= "<span class='textobsel-attr'>ID View</span>: $idview <br/>";
				$details.= "<span class='textobsel-attr'>Number of documents</span>: $nbdocs <br/>";
			}
			elseif($request=="ws/sec/page"){
				$details.= "<span class='textobsel-attr'>Document Title</span>: $titleDoc <br/>";
				$details.= "<span class='textobsel-attr'>Author</span>: $author <br/>";
				$details.= "<span class='textobsel-attr'>Page</span>: $numPage <br/>";
				$details.= "<span class='textobsel-attr'>Page Link</span>: <a href='$pageUri'>Go to the page</a> <br/>";
			}
			elseif($request=="ws/sec/page"){
				$details.= "<span class='textobsel-attr'>Document Title</span>: $titleDoc <br/>";
				$details.= "<span class='textobsel-attr'>Author</span>: $author <br/>";
				$details.= "<span class='textobsel-attr'>Page</span>: $numPage <br/>";
				$details.= "<span class='textobsel-attr'>Page Link</span>: <a href='$pageUri'>Go to the page</a> <br/>";
			}
			elseif($request=="retour sommaire"){
				$details.= "<span class='textobsel-attr'>TV Title</span>: $tv <br/>";
			}
			elseif($request=="deconnection"){
				
			}
			elseif(isset($button)){
				$details = "<span class='textobsel-attr'>Button</span>: $button <br/>";
				$details.= "<span class='textobsel-attr'>Go View</span>: $goidview <br/>";
				$details.= "<span class='textobsel-attr'>Go Page</span>: <a href='$info_pageUri'>Go to the page</a> <br/>";
				$details.= "<span class='textobsel-attr'>Go View*</span>: $idview <br/>";
			}
			
		}
		elseif($type=="ozec_w"){
			$text = "At $begin, the user (id=$user) <span style='color:#CCCC00'>$action</span> from [<span style='color:red'>$before</span>] to [<span style='color:red'>$after</span>]";
			$details= "<span class='textobsel-attr'>Page Link</span>: <a href='$pageUri'>Go to the page</a> <br/>";
			$details.= "<span class='textobsel-attr'>Corrected Word</span>: $rfW<br/>";
			$details.= "<span class='textobsel-attr'>Before</span>: $before<br/>";
			$details.= "<span class='textobsel-attr'>After</span>: $after<br/>";
			
		}
		elseif($type=="oze_subview"){
			$text = "At $begin, the user (id=$user) <span style='color:#CCCC00'>$action</span>";
			$details= "<span class='textobsel-attr'>Document</span>: <a href='$info_idDocUri'>Go to the document</a> <br/>";
			$details.= "<span class='textobsel-attr'>Sub View</span>: $idsubview<br/>";
			$details.= "<span class='textobsel-attr'>Label</span>: $label<br/>";
			
			
		}
		elseif($type=="ozev_w"){
			$text = "At $begin, the user (id=$user) <span style='color:#CCCC00'>$action</span>";
			$details= "<span class='textobsel-attr'>Reference word</span>: $rfW <br/>";
			$details.= "<span class='textobsel-attr'>Text</span>: $info_text<br/>";	
		}
		elseif($type=="ozem_fn"){
			if($request=="send corrections"){
				if($status=="begin"){
					
					$text = "At $begin, the user (id=$user) <span style='color:#CCCC00'> sent corrections</span>";
					$details = "<span class='textobsel-attr'>Request</span>: $request <br/>";
					$details.= "<span class='textobsel-attr'>Status</span>: $status<br/>";
					$details.= "<span class='textobsel-attr'>Correction Count</span>: $correctionCount<br/>";
					
				}elseif($status=="end"){
					
					$text = "At $begin, the corrections of the user (id=$user) <span style='color:#CCCC00'> were sent</span>";
					$details = "<span class='textobsel-attr'>Request</span>: $request<br/>";
					$details.= "<span class='textobsel-attr'>Status</span>: $status<br/>";
					
				}else{
					$text = "At $begin, the user (id=$user) <span style='color:#CCCC00'> sent corrections</span>";
					$details = "<span class='textobsel-attr'>Request</span>: $request<br/>";
					$details.= "<span class='textobsel-attr'>Status</span>: $status<br/>";
				}
			}else{
				$text = "At $begin, the user (id=$user) <span style='color:#CCCC00'>$action</span>";
				$details = "<span class='textobsel-attr'>Request</span>: $request <br/>";
				$details.= "<span class='textobsel-attr'>Status</span>: $status<br/>";
			}
		}
		else{
			$text = "At $begin, the user (id=$user) $action (before=$before,after=$after) on the page $idPage of the document(<a href='$docUri'>$titleDoc</a>) ";
		}		
		
		$html = str_replace("\$text",$text,$html);
		$html = str_replace("\$details",$details,$html);
		
		return $html;
	}
}