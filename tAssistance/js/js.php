<?php

require 'jsmin.php';

header("Content-type: text/javascript");

$debug = true;

$files = array("../js/jquery.js"
				,"../js/dateFormat.js"				
				,"../js/tAssistance.js"
				,"../js/tAssistance.Datetime.js"
				,"../js/tAssistance.Data.js"
				//,"../js/tAssistance.Rule.js"
				,"../js/tAssistance.OzaObselLabel.js"
				,"../js/tAssistance.TraceDoc.js"
				,"../js/tAssistance.ComboTrace.js"
				,"../js/tAssistance.OzaObselSearch.js"
				,"../js/tAssistance.TextObselMarker.js"
				,"../js/tAssistance.OzaGroup.js"
				,"../js/tAssistance.OzaObsel.js"
				,"../js/tAssistance.OzaTrace.js"
				,"../js/tAssistance.ObselMarker.js"
				,"../js/tAssistance.Load.js"
				,"../js/tAssistance.Obsel.js"
				,"../js/tAssistance.Obsels.js"
				,"../js/tAssistance.Util.js"
				,"../js/tAssistance.Group.js"
				,"../js/tAssistance.makeOzaObsel.js"
				,"../js/tAssistance.SVG.js"
				,"../js/tAssistance.Mousepad.js"
				,"../js/tAssistance.Touchpad.js"
				,"../js/tAssistance.Rule.js"
				,"../js/tAssistance.Rules.js"
				,"../js/tAssistance.Selector.js"
				,"../js/tAssistance.Style.js"
				,"../js/tAssistance.TextObsel.js"
				,"../js/tAssistance.OzaTraceSearch.js"
				,"../js/tAssistance.OzaTraceList.js"
				,"../js/tAssistance.OzaObselList.js"
				,"../js/tAssistance.OzaTextObsel.js"
				,"../js/tStore.js"
				,"../js/tStore.OzaTStore.js"
				,"../js/tStore.makeFilter.js"
				,"../js/tStore.Trace.js"
				);

$js = "";
foreach($files as $f)
  $js .= file_get_contents($f);
  
if ($html) {
  foreach($filesHtml as $f)
  $js .= file_get_contents($f);
}

if($debug) {
  echo $js;
} else {
  echo $jsmin_php = JSMin::minify($js);
}