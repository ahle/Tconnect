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
				,"../js/common/Obsels.js"
				,"../js/common/OzaAssistantClient.js"
				,"../js/common/Json.js"
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
				,"../js/tAssistance.Util.js"
				,"../js/tAssistance.Group.js"
				,"../js/tAssistance.makeOzaObsel.js"
				,"../js/com/OzaImageObsel.js"
				,"../js/ctrler/OzaImageObselMaker.js"
				,"../js/tAssistance.SVG.js"
				,"../js/com/Mousepad.js"
				,"../js/tAssistance.Touchpad.js"
				,"../js/tAssistance.Rule.js"
				,"../js/tAssistance.Store.js"
				,"../js/tAssistance.Rules.js"
				,"../js/tAssistance.Selector.js"
				,"../js/tAssistance.Style.js"
				,"../js/tAssistance.TextObsel.js"
				,"../js/tAssistance.OzaTraceSearch.js"
				,"../js/ctrler/OzaTraceListMaker.js"
				,"../js/ctrler/OzaUserListMaker.js"
				,"../js/ctrler/OzaTDocListMaker.js"
				,"../js/ctrler/OzaDocListMaker.js"
				,"../js/ctrler/OzaWordListMaker.js"
				,"../js/ctrler/OzaGraTraceMaker.js"
				,"../js/ctrler/OzaDashBoardMaker.js"
				,"../js/ctrler/OzaGroupMaker.js"
				,"../js/ctrler/OzaTextObselMaker.js"
				,"../js/ctrler/OzaObselListMaker.js"	
				,"../js/ctrler/OzaObselLabelMaker.js"
				,"../js/ctrler/OzaZoomMaker.js"
				,"../js/ctrler/TraceModelMaker.js"
				,"../js/ctrler/OzaMaker.js"		
				,"../js/tAssistance.OzaTraceWidget.js"
				,"../js/com/OzaTraceRow.js"
				,"../js/com/OzaUserRow.js"
				,"../js/com/OzaBarChart.js"
				,"../js/com/OzaDocRow.js"
				,"../js/com/OzaDocList1.js"
				,"../js/com/OzaWordList.js"
				,"../js/com/OzaWordRow.js"
				,"../js/com/OzaDashBoard.js"
				,"../js/com/OzaGraTrace.js"
				,"../js/com/OzaTextObsel.js"
				,"../js/com/MousePad.js"
				,"../js/tAssistance.dom.js"
				,"../js/dom/OzaWordRow.js"
				,"../js/dom/OzaTraceSvg.js"
				,"../js/dom/OzaDocRow1.js"
				,"../js/dom/OzaWordList.js"
				,"../js/dom/OzaGroup.js"
				,"../js/dom/OzaImageObsel.js"
				,"../js/dom/CenterLine.js"
				,"../js/dom/MousePad.js"
				,"../js/dom/OzaObselLabel.js"
				,"../js/dom/OzaZoom.js"
				,"../js/dom/OzaTraceHeading.js"
				,"../js/dom/OzaTraceHeading1.js"
				,"../js/dom/OzaTraceContainer.js"
				,"../js/dom/OzaTraceBtnGroup.js"
				,"../js/dom/OzaTextObsel.js"
				,"../js/dom/OzaTimelineSetting.js"
				,"../js/dom/Layout.js"
				,"../js/com/OzaDocRow1.js"				
				,"../js/com/OzaObselList.js"							
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