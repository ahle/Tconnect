tAssistance.OzaTraceWidget = function(id, parentNode, trace){
	this.id = id;
	this.obsel_list;
	this.trace = trace;
	this.zoomDefault = 14;
	var zoom = this.zoomDefault;
	
	//obsels = trace.obsels;
	
	//make a div
	var traceid =  "trace"+(new Date()).getTime();
	
	//var icon = '';
	var buttons = '<div class="jarviswidget-ctrls" role="menu"> \
		<a href="javascript:void(0);" class="button-icon jarviswidget-toggle-btn" rel="tooltip" title="" data-placement="bottom" data-original-title="Collapse"> \
	<i class="fa fa-minus "></i> \
</a> \
<a href="javascript:void(0);" class="button-icon jarviswidget-fullscreen-btn" rel="tooltip" title="" data-placement="bottom" data-original-title="Fullscreen"> \
	<i class="fa fa-expand "></i> \
</a> \
<a href="javascript:void(0);" class="button-icon jarviswidget-delete-btn" rel="tooltip" title="" data-placement="bottom" data-original-title="Delete"> \
	<i class="fa fa-times"></i> \
</a> \
</div>';
	var trace_txt = '<img src="img/trace.png" height="14px" width="14px"> <a href="#">Trace ID: 123456</a> ';
	
	var user_txt = '<span class="glyphicon glyphicon-user"></span> <a href="#">hoang</a> ';
	var doc_txt = '<span class="glyphicon glyphicon-file"></span> <a href="#">doc1</a> ';
	
	var view_btn = '<img src="img/text-graph.png" height="14px" width="14px"> <a href="#">Graph/Text</a> ';
	
	var stat_btn = '<span class="glyphicon glyphicon-stats"></span> <a href="#">Charts</a> ';
	
	var heading_tmp = '<div class="panel panel-default"> \
	     \
	</div>';
    
	var div = document.createElement("div");
	div.setAttribute("class","panel panel-default");
	div.setAttribute("id",traceid);
	
	parentNode.appendChild(div);
	
	var panel_heading = document.createElement("div");
	panel_heading.setAttribute("class","panel-heading");
	
	div.appendChild(panel_heading);
	
	var panel_body = document.createElement("div");
	panel_body.setAttribute("class","panel-body");
	
	div.appendChild(panel_body);
	
	panel_heading.innerHTML = trace_txt+user_txt+doc_txt+view_btn+stat_btn;
	
	var doc = new tAssistance.TraceDoc("a", panel_body, trace);
	
};