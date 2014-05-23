<?php

require 'jsmin.php';

header("Content-type: text/javascript");

$debug = true;

$files = array("../js/jquery.js"
				,"../js/dateFormat.js"				
				,"../js/tAssistance.js"
				,"../js/tAssistance-datetime.js"
				,"../js/tAssistance-data.js"
				,"../js/tAssistance-rule.js"
				,"../js/tAssistance-dom.js"
				,"../js/tAssistance-dom-group.js"
				,"../js/tAssistance-dom-obsel.js"
				,"../js/tAssistance-dom-trace.js"
				,"../js/tAssistance-dom-trace-linear.js"
				,"../js/tAssistance-load.js"
				,"../js/tAssistance-obsel.js"
				,"../js/tAssistance-obsels.js"
				,"../js/tAssistance-outil.js"
				,"../js/tAssistance-group.js"
				,"../js/tAssistance-makeOzaObsel.js"
				,"../js/tAssistance-svg.js"
				,"../js/tAssistance-mousepad.js"
				,"../js/tAssistance-touchpad.js"
				,"../js/tAssistance-rule.js"
				,"../js/tAssistance-rules.js"
				,"../js/tAssistance-selector.js"
				,"../js/tAssistance-style.js"
				,"../js/tAssistance-textObsel.js"
				,"../js/tAssistance-OzaTraceSearch.js"
				,"../js/tStore.js"
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