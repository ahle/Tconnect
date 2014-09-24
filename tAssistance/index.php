<?php
$tAssistance_dir = dirname(__FILE__);
require_once $tAssistance_dir.'/php/global.php';

$session_id = session_id();
#$user_id = get_user($session_id); // comment for debug
$user_id = "u1";// debug, need to be uncommented
$application_server_url = "https://ozalid.orange-labs.fr/oz/ws/open/page/";

if($_GET["page"]=="TraceView" && $_GET["mode"]=="demo"){
	global $base_uri;
	//$trace_uri = $base_uri."trc_".$user_id."/";
	//$trace_uri = $base_uri."no_doc/";
	$trace_uri = $base_uri."52fa4364e4b09db6f09a3f64/";
	
	$page = file_get_contents($root_dir."/html/Trace.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$trace_uri", $trace_uri, $page);

	echo $page;
	exit;
}

if($_GET["page"]=="TraceView" && $_GET["mode"]=="admin" && $_GET["trace"]){
	//$trace_uri = $base_uri."trc_".$user_id."/";
	//$trace_uri = $base_uri."no_doc/";
	$trace_uri = $_GET["trace"];

	$page = file_get_contents($root_dir."/html/Traces.html");
	$page = str_replace("\$user_id", "undefined", $page);
	$page = str_replace("\$trace_uri", $trace_uri, $page);

	echo $page;
	exit;
}

if($_GET["page"]=="TraceGraph" && $_GET["trace"]){
	//$trace_uri = $base_uri."trc_".$user_id."/";
	//$trace_uri = $base_uri."no_doc/";
	$trace_uri = $_GET["trace"];

	$page = file_get_contents($root_dir."/html/Trace.html");
	//$page = str_replace("\$user_id", "undefined", $page);
	//$page = str_replace("\$trace_uri", $trace_uri, $page);

	echo $page;
	exit;
}

if($_GET["page"]=="TraceView" && $_GET["mode"]=="admin"){
	global $ktbs_uri;
	
	$json = file_get_contents("http://localhost/tconnect/project/Ozalid/TStore/api.php/users");
	$users = json_decode($json);
	
	$connection_html = "<a href=\"".$ktbs_uri."\">".$ktbs_uri."</a>,";
	$users_html="";
	$traces_html="";
	$selected_user = "";
	
	if(isset($_GET["user"])){
		$selected_user = $_GET["user"];
		$user_uri = "index.php?mode=admin&page=TraceView&user=$selected_user";
		$users_html = "<a href=\"".$user_uri."\">".$selected_user."</a>";
		
		$json = file_get_contents("http://localhost/tconnect/project/Ozalid/TStore/api.php/traces?userid=".$selected_user);
		$traces = json_decode($json);
		
		foreach($traces as $trace){
			$trace_uri = "index.php?mode=admin&page=TraceView&trace=$trace";
			$trace_short_uri = str_replace($ktbs_uri, "", $trace);
			$traces_html.= "<a href=\"".$trace_uri."\">".$trace_short_uri."</a>,";
		}		
	}
	else{
		foreach($users as $user){
			$user_uri = "index.php?mode=admin&page=TraceView&user=$user";
			$users_html.= "<a href=\"".$user_uri."\">".$user."</a>,";
		}
		
		$json = file_get_contents("http://localhost/tconnect/project/Ozalid/TStore/api.php/traces");
		$traces = json_decode($json);
		
		foreach($traces as $trace){
			$trace_uri = "index.php?mode=admin&page=TraceView&trace=$trace";
			$trace_short_uri = str_replace($ktbs_uri, "", $trace);
			$traces_html.= "<a href=\"".$trace_uri."\">".$trace_short_uri."</a>,";
		}
	}
	
	$page = file_get_contents($root_dir."/html/admin.html");
	$page = str_replace("\$connection", $connection_html, $page);
	$page = str_replace("\$users", $users_html, $page);
	$page = str_replace("\$traces", $traces_html, $page);

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

	$page = "<div class=\"table-responsive span5\">
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

	$text_obsel = new TextObsel($obsel);
	$html_fragment = $text_obsel->toHtml();
		
	echo $html_fragment;
	exit;
}

if($_GET["page"]=="UserPreference"){
	$user_id = $_GET["userid"];

	//echo $obsel;
	$page = file_get_contents($root_dir."/html/UserPreference.html");

	echo $page;
	exit;
}

if($_GET["page"]=="login"){
	
	require_once "php/login.php";
	
	exit;
}

if($_GET["page"]=="Trace"){
	$user_id = $_SESSION["user"];
	$trace_uri = $_GET["trace_uri"];

	$page = file_get_contents("html/layout1.html");
	$page = str_replace("\$user_id", $user_id, $page);
	$page = str_replace("\$script", "var page = new tAssistance.TracePage('".$trace_uri."');", $page);

	echo $page;
	exit;
}

require_once $tassist_php_dir."/oza-index.php";
