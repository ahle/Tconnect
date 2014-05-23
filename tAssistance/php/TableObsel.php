<?php

class TableObsel{
	
	public $str_obsel_attr = array(
			"@id"=>"ID obsel",
			"@type"=>"Type",
			"m:idPage"=>"ID Page",
			"m:idDoc" =>"ID Document",
			"m:info_before" =>"Before",
			"m:info_after" =>"After",
			"m:user" =>"User",
			"m:idSession" =>"ID Session",
			"m:info_titleDoc" =>"Document Title",
			"begin" => "Begin",
			"end" => "End",
			"m:info_author" =>"Author",
			"m:info_idDoc" =>"Info ID Document",
			"m:info_text" =>"Info Text",
	);
	
	public $str_obsel_type = array(
			"m:oze_idg"=>"Session utilisateur",
			"m:ozec_w"=>"Corriger un mot",
			"m:oze_view"=>"Afficher une vue particuliere",
			"m:idDoc" =>"ID Document",
			"m:info_before" =>"Before",
			"m:info_after" =>"After",
			"m:user" =>"User",
			"m:idSession" =>"ID Session",
			"begin" => "Begin",
			"end" => "End",
			"m:ozev_w" => "Valider un mot",
			"m:oze_subview" => "Afficher une sous-vue particuliere",
			"m:ozem_fn" => "autre evenement"
	);
	
	public $obsel_attr = array(
		"type"=> "@type",
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
		
		$html = file_get_contents("/var/www/tconnect/tAssistance/html/TableObsel.html");
		
		$str_obsel_attr = $this->str_obsel_attr;
				
		// text, labels
				
		$obsel = $this->obsel;
		
		$properties_html = "";
		
		$idPage = "";
		$idDoc = "";
		foreach($obsel as $p => $o){
			if($p=="begin"||$p=="end"){
				$p = $str_obsel_attr[$p];
				$o1 = $o;
				$date=date_create();
				//$time = date_timestamp_get($date);
				date_timestamp_set($date,$o/1000);
				$milliseconds = fmod($o,1000);
				$o = date_format($date,"Y-m-d H:i:s.".str_pad($milliseconds, 3, "0", STR_PAD_LEFT)." T");
				//utc_to_local('M j Y g:i:s a T',$o,'America/New_York');
				//$o = date_format($object, $format)
			}
			if($p=="@id"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
			}
			elseif($p=="subject"){
			}
			elseif($p=="@type"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
			}
			elseif($p=="m:idSession"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
			}
			elseif($p=="m:idDoc"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idDoc = $o;
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."<a href='".htmlentities($application_server_url.$idDoc."/image")."'>image</a></td></tr>";
			}
			elseif($p=="m:idPage"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idPage = $o;
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."<a href='".htmlentities($application_server_url.$idPage."/image")."'>image</a></td></tr>";
			}
			elseif($p=="m:info_before"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
			}
			elseif($p=="m:info_after"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
			}
			elseif($p=="m:user"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$idPage = $o;
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
			}
			elseif($p=="m:info_titleDoc"){
				$p1 = $this->parse_obsel_attr($p);
				$o = $this->parse_obsel_value($p,$o);
				$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".mb_convert_encoding($o, 'HTML-ENTITIES', 'UTF-8')."</td></tr>";
			}
			else{
				if(true){
					$o = $this->parse_obsel_value($p,$o);
					$properties_html.= "<tr><td style='font-size: 12px'><code>".htmlentities($p)."</code></td><td style='font-size: 12px;'>".$o."</td></tr>";
				}
			}		
			
		}
		
		$html = str_replace("\$proprieties", $properties_html, $html);
		
		
		return $html;
	}
}