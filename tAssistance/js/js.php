<?php

require 'jsmin.php';

header("Content-type: text/javascript");

$debug = true;

$files = array( "../lib/jquery/jquery.js"
				,"../lib/moment/moment.js"
				,"../js/dateFormat.js"				
				,"../js/tAssistance.js"
				,"../js/common/Datetime.js"
				,"../js/common/Data.js"
				,"../js/com/OzaObselLabel.js"
				,"../js/tAssistance.TraceDoc.js"
				,"../js/com/ComboTrace.js"
				,"../js/tAssistance.OzaObselSearch.js"
				,"../js/tAssistance.TextObselMarker.js"
				,"../js/com/OzaGroup.js"
				,"../js/tAssistance.OzaSeqGroup.js"
				,"../js/tAssistance.OzaObsel.js"
				,"../js/ctrler/OzaTrace.js"
				,"../js/tAssistance.OzaTraceModel.js"
				,"../js/ctrler/ObselMarker.js"
				,"../js/tAssistance.Load.js"
				,"../js/tAssistance.Obsel.js"
				,"../js/common/Obsels.js"
				,"../js/tAssistance.Util.js"
				,"../js/tAssistance.Group.js"
				,"../js/tAssistance.makeOzaObsel.js"
				,"../js/com/OzaImageObsel.js"
				,"../js/ctrler/OzaImageObselMaker.js"
				,"../js/tAssistance.SVG.js"
				,"../js/com/Mousepad.js"
				,"../js/tAssistance.Touchpad.js"
				,"../js/tAssistance.Rule.js"
				,"../js/tAssistance.Rules.js"
				,"../js/tAssistance.Selector.js"
				,"../js/tAssistance.Style.js"
				,"../js/tAssistance.TextObsel.js"
				,"../js/tAssistance.OzaTraceSearch.js"
				,"../js/ctrler/OzaTraceListMaker.js"
				,"../js/ctrler/OzaUserListMaker.js"
				,"../js/ctrler/OzaTDocListMaker.js"
				,"../js/ctrler/OzaDocListMaker.js"
				,"../js/ctrler/OzaWordFreMaker.js"
				,"../js/tAssistance.OzaTraceWidget.js"
				,"../js/com/OzaTraceRow.js"
				,"../js/com/OzaUserRow.js"
				,"../js/com/OzaBarChart.js"
				,"../js/com/OzaDocRow.js"
				,"../js/com/OzaDocRow1.js"
				,"../js/common/OzaAssistantClient.js"
				,"../js/com/OzaObselList.js"
				,"../js/ctrler/OzaTextObsel.js"
				,"../js/com/OzaImageObsel.js"
				,"../js/page/TracePage.js"
				,"../js/page/TraceListPage.js"
				,"../js/page/UserListPage.js"
				,"../js/page/DocListPage.js"
				,"../js/page/DashBoardPage.js"
				,"../js/tStore.js"
				,"../js/tStore.OzaTStore.js"
				,"../js/tStore.makeFilter.js"
				,"../js/tStore.Trace.js"
				,"../js/tStore.OzaTStoreClient.js"
				,"../lib/treeview/js/bootstrap-treeview.js"
				,"../lib/imgcorrect/imgcorrect.min.js"
				,"../lib/slider/js/bootstrap-slider.js"
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