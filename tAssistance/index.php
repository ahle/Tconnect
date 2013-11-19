<?php
$dir = dirname(__FILE__);
require_once $dir.'/php/global.php';


$session_id = session_id();
#$user_id = get_user($session_id); // comment for debug
$user_id = "u1";// debug, need to be uncommented
$application_server_url = "https://ozalid.orange-labs.fr/oz/ws/open/page/";

if($_GET["page"]=="TraceView" && $_GET["mode"]=="admin"){
	global $base_uri;
	$trace_uri = $base_uri."trc_".$user_id."/";

	$page = file_get_contents($root_dir."/html/Trace.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$trace_uri", $trace_uri, $page);

	echo $page;
	exit;
}

if($_GET["page"]=="TraceView" && $_SERVER[REQUEST_METHOD]=="GET"){
	
	$page = file_get_contents($root_dir."/html/boot.html");

	echo $page;
	exit;
}

if($_GET["page"]=="TraceView" && $_SERVER[REQUEST_METHOD]=="POST"){
	//global $base_uri;
	
	$message = $_POST;
	$base_uri = $message["base_uri"];
	$trace_id = $message["trace_id"];
	$user_id = $message["user_id"];
	$trace_uri = $base_uri.$trace_id."/";

	$page = file_get_contents($root_dir."/html/Trace.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$trace_uri", $trace_uri, $page);

	echo $page;
	exit;
}

if($_GET["page"]=="selector" && $_GET["p1"]=="all"){

	$selectors = selector_get_all();

	$page = "<div class='table-responsive span5 table-bordered'>";
	$page.= "<table class='table table-property'>";
	$page.= "<caption><div style='border-radius: 4px;background-color: #F9F9F9; padding: 3px'>Selectors<button type='button' class='close' aria-hidden='true' onclick=\"document.getElementById('selectorsPanel').innerHTML='';\">&times;</button></div></caption>";
	$page.= "<tr><td style='font-size: 12px'>";
	$page.= "<button name='new'><i class='icon-plus'></i></button><button name='remove'><i class='icon-remove'></i></button>";
	foreach($selectors as $selector){
		if(true){
			$page.= "<label class='checkbox'><input type='checkbox' name='".htmlentities($selector->id)."'>".mb_convert_encoding($selector->id, 'HTML-ENTITIES', 'UTF-8')."</label>";
		}
	}
	$page.= "</td></tr></div>";

	echo $page;
	exit;
}

if($_GET["page"]=="selector" && $_GET["p1"]=="new"){

	$page = file_get_contents($root_dir."/html/selector_editor.html");

	echo $page;
	exit;
}

if($_GET["page"]=="rule" && $_GET["p1"]=="all"){

	$rules = rule_get_all();

	$page = "<div class='table-responsive span5 table-bordered'>";
	$page.= "<table class='table table-property'>";
	$page.= "<caption><div class='window-caption'>Rules<button type='button' class='close' aria-hidden='true' onclick=\"document.getElementById('rulesPanel').innerHTML='';\">&times;</button></div></caption>";
	$page.= "<tr><td style='font-size: 12px'>";
	$page.= "<button name='new'><i class='icon-plus'></i></button><button name='remove'><i class='icon-remove'></i></button>";
	foreach($rules as $rule){
		if(true){
			$page.= "<label class='checkbox'><input type='checkbox' name='".htmlentities($rule->id)."'>".mb_convert_encoding($rule->id, 'HTML-ENTITIES', 'UTF-8')."</label>";
		}
	}
	$page.= "</td></tr></div>";

	echo $page;
	exit;
}

if($_GET["page"]=="rule" && $_GET["p1"]=="new"){
	$selectors = selector_get_all();
	$styles= style_get_all();
	$rules = rule_get_all();

	$page="<div class=\"table-responsive span5\">
<table class=\"table table-striped table-bordered\" style=\"padding: 3px;word-wrap: break-word;table-layout:fixed;\">
<caption><div class=\"window-caption\">New rule<button type=\"button\" class=\"close\" aria-hidden=\"true\">×</button></div></caption>
<tr>
<td>

<form id=\"rule_editor\" class=\"form-horizontal\">
<div class=\"control-group\">
<label class=\"col-sm-2 control-label\">Id</label>
<div class=\"controls\">
 	<input name='id' type=\"text\" class=\"span2\" placeholder=\"auto\">
</div>
</div>
<div class=\"control-group\">
 <label class=\"col-sm-2 control-label\">Selector</label>
 <div class=\"controls\">
 <select name='selector' class=\"span2 selectors\"> 	";
	for($i=0;$i<count($selectors);$i++){
		$page .= "	<option value=\"".$selectors[$i]->id."\">".$selectors[$i]->id."</option> ";
	}
	$page .= "  </select>
</div>
</div>
<div class=\"control-group\">
 <label class=\"col-sm-2 control-label\">Style</label>
 <div class=\"controls\">
 <select name='style' class=\"span2 styles\">";
	for($i=0;$i<count($styles);$i++){
		$page .= "	<option value=\"".$styles[$i]->id."\">".$styles[$i]->id."</option> ";
	}
	$page .= "  </select>
</div>
</div>
<div class=\"control-group\">
 <label class=\"col-sm-2 control-label\">Priority</label>
 <div class=\"controls\">
 <input name='priority' type=\"number\" class=\"span1\" placeholder=\"auto\">
</div>
</div>
<div class=\"control-group\">
<div class=\"controls\">
 	<button name=\"save\" type=\"button\" class=\"btn btn-default\">Save</button>
</div>
</div>
 </form>

</td></tr>
</table>
</div>";


	echo $page;
	exit;
}

if($_GET["page"]=="style" && $_GET["p1"]=="all"){

	$styles = style_get_all();

	$page = "<div class='table-responsive span5 table-bordered'>";
	$page.= "<table class='table table-property'>";
	$page.= "<caption><div style='border-radius: 4px;background-color: #F9F9F9; padding: 3px'>Styles<button type='button' class='close' aria-hidden='true' onclick=\"document.getElementById('stylesPanel').innerHTML='';\">&times;</button></div></caption>";
	$page.= "<tr><td style='font-size: 12px'>";
	$page.= "<button name='new'><i class='icon-plus'></i></button><button name='remove'><i class='icon-remove'></i></button>";
	foreach($styles as $style){
		if(true){
			$page.= "<label class='checkbox'><input type='checkbox' name='".htmlentities($style->id)."'> <img src='".$style->icon."' width='20px' height='20px'/> ".mb_convert_encoding($style->id, 'HTML-ENTITIES', 'UTF-8')."</label>";
		}
	}
	$page.= "</td></tr></div>";

	echo $page;
	exit;
}

if($_GET["page"]=="style" && $_GET["p1"]=="new"){

	$page = file_get_contents($root_dir."/html/style_editor.html");

	echo $page;
	exit;
}

if($_GET["page"]=="element"){
	$element = $_GET["p1"];

	$html = file_get_contents($root_dir."/html/$element.html");
	$js = file_get_contents($root_dir."/html/$element.js");
	$ret = new stdClass();
	$ret->html = $html;
	$ret->js = $js;

	$page = json_encode($ret);

	echo $page;
	exit;
}

if($_GET["page"]=="Property"){
	global $str_obsel_attr;
	
	$obsel_id = $_GET["id"];
	$obsel_str = $_GET["obsel"];
	$obsel = json_decode($obsel_str);

	//$page = file_get_contents($root_dir."/html/Property.html");
	//echo $obsel;
	$page = "<div class='table-responsive span5'>";
	$page.= "<table class='table table-striped table-bordered table-property'>";
	$page.= "<caption><div style='border-radius: 4px;background-color: #F9F9F9; padding: 3px'>Properties<button type='button' class='close' aria-hidden='true' onclick=\"document.getElementById('controlPanel').innerHTML='';\">&times;</button></div></caption>";
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
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
		}
		elseif($p=="subject"){			
		}
		elseif($p=="@type"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
		}
		elseif($p=="m:idSession"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
		}
		elseif($p=="m:idDoc"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$idDoc = $o;
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."<a href='".htmlentities($application_server_url.$idDoc."/image")."'>image</a></td></tr>";
		}
		elseif($p=="m:idPage"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$idPage = $o;
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."<a href='".htmlentities($application_server_url.$idPage."/image")."'>image</a></td></tr>";
		}
		elseif($p=="m:info_before"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
		}
		elseif($p=="m:info_after"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
		}
		elseif($p=="m:user"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$idPage = $o;
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".($o)."</td></tr>";
		}
		elseif($p=="m:info_titleDoc"){
			$p1 = parse_obsel_attr($p);
			$o = parse_obsel_value($p,$o);
			$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p1)."</code></td><td style='font-size: 12px;'>".mb_convert_encoding($o, 'HTML-ENTITIES', 'UTF-8')."</td></tr>";
		}
		else{
			if(true){
				$o = parse_obsel_value($p,$o);
				$page.= "<tr><td style='font-size: 12px'><code>".htmlentities($p)."</code></td><td style='font-size: 12px;'>".$o."</td></tr>";
			}
		}
		$page.= "</div>";

		//$page = str_replace("\$style_id", $style_id, $page);		
	}
	echo $page;
	exit;
}

	if($_GET["page"]=="UserPreference"){
		$user_id = $_GET["userid"];

		//echo $obsel;
		$page = file_get_contents($root_dir."/html/UserPreference.html");

		echo $page;
		exit;
	}
